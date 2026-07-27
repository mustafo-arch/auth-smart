import { create } from 'zustand';
import axios from 'axios';
import { authApi } from '../api/authApi';
import type { RefreshResponse, User } from '../types/type';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitializing: boolean;
  
  setAuth: (data: { user: User; accessToken: string }) => void;
  setAccessToken: (token: string) => void;
  logout: () => Promise<void>; 
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
  isInitializing: false,

  setAuth: ({ user, accessToken }) => 
    set({ user, accessToken, isAuthenticated: true, isLoading: false }),

  setAccessToken: (accessToken) => 
    set({ accessToken }),

  logout: async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.log(error);
    } finally {
      set({ 
        user: null, 
        accessToken: null, 
        isAuthenticated: false, 
        isLoading: false, 
        isInitializing: false 
      });
    }
  },

  initializeAuth: async () => {
    if (get().isInitializing) return;
    
    set({ isLoading: true, isInitializing: true }); 
    
    try {
      if (!get().accessToken) {
        const { data } = await axios.post<RefreshResponse>(
          'http://localhost:3000/api/auth/refresh', 
          {}, 
          { withCredentials: true }
        );
        set({ accessToken: data.accessToken });
      }
      
      const { data: userData } = await axios.get('http://localhost:3000/api/auth/me', {
        headers: { Authorization: `Bearer ${get().accessToken}` },
        withCredentials: true
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      set({ user: userData, isAuthenticated: true, isLoading: false, isInitializing: false });
    } catch (error: unknown) {
      console.error(error);
      await new Promise(resolve => setTimeout(resolve, 1500));
      set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false, isInitializing: false });
    }
  }
}));