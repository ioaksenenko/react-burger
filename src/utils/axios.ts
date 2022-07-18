import axios from "axios";
import { BASE_URL, TOKEN_URL } from "./urls";
import { getCookie, setCookie } from "./cookie";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    config => {
        let accessToken = getCookie('accessToken');
        if (!(config.headers ??= {})['Authorization'] && accessToken) {
            (config.headers ??= {})['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const token = window.localStorage.getItem('refreshToken');
        const status = error?.response?.status;
        const message = error?.response?.data?.message;
        if (status === 403 && message === 'jwt expired' && token) {
            const response: {success: boolean; accessToken: string} = await axiosInstance.post(TOKEN_URL, { data: { token: token } });
            if (response?.success) {
                setCookie('accessToken', response.accessToken.split('Bearer ')[1]);
            }
        }
        return Promise.reject(error);
    }
);