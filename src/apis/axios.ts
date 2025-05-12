import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
            //window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

