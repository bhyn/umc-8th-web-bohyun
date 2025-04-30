import axios, { InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<string> | null = null; // 변수는 let 이어야 나중에 대입 가능

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem();

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (originalRequest.url === "/v1/auth/refresh") {
        const { removeItem: removeAccessToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.accessToken
        );
        const { removeItem: removeRefreshToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.refreshToken
        );
        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          const refreshToken = getRefreshToken();

          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });

          const { setItem: setAccessToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken
          );
          const { setItem: setRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );

          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

          return data.data.accessToken;
        })()
          .catch((error) => {
            const { removeItem: removeAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken
            );
            const { removeItem: removeRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );
            removeAccessToken();
            removeRefreshToken();
            window.location.href = "/login";
            return Promise.reject(error);
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      return refreshPromise.then((newAccessToken: string) => {
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance.request(originalRequest);
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
