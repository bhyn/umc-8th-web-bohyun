import axios from 'axios';
import { LOCAL_STORAGE_KEY } from '../constants/key'; // 로컬 스토리지 키 상수
import { useLocalStorage } from '../hooks/useLocalStorage';


export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,

    headers: {
      Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)}`,
    },

});