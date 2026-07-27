import axios from 'axios';
import { useAuthStore } from '../auth/store/authStore';
import type { RefreshResponse } from '../auth/types/type';


const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, 
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post<RefreshResponse>(
          'http://localhost:3000/api/auth/refresh', 
          {}, 
          { withCredentials: true } 
        );

        useAuthStore.getState().setAccessToken(data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);
        useAuthStore.getState().logout();
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
