import api from "../../api/axiosApi";
import type { AuthResponse } from "../types/type";

export const authApi = {
  login: async (phone: string, password: string) => {
    const { data } = await api.post<AuthResponse>('/auth/login', {
      phone,
      password,
      deviceName: navigator.userAgent,
    });
    return data;
  },

  getMe: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  },

  logout: async () => {
    await api.post('/auth/logout');
  },

  forgotPassword: async (phone: string) => {
    const { data } = await api.post<{ message: string; resetToken?: string }>('/auth/forgot-password', {
      phone,
    });
    return data;
  },

  resetPassword: async (token: string, newPassword: string) => {
    const { data } = await api.post<{ message: string }>('/auth/reset-password', {
      token,
      newPassword,
    });
    return data;
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const { data } = await api.post<{ message: string }>('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return data;
  },
};