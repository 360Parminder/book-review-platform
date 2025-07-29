import axios from 'axios';
import { getToken } from '../utils/auth'; // Adjust the import path as necessary

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL ,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async config => {
        // Skip token for login and register endpoints
        if (config.url === '/users/login' || config.url === '/users/signup') {
            return config;
        }

        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error),
);

apiClient.interceptors.response.use(
    response => response,
    async error => {
        // console.log('API Error:', error.status);
        if (error.message === 'Network Error') {
            showToast('error', 'Network Error');
        }

        if (error.response?.status === 401) {
        }
        return Promise.reject(error);
    },
);

export default apiClient;