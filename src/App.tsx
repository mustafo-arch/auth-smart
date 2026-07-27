// src/App.tsx
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './auth/store/authStore';
import { AuthGuard } from './auth/guards/authGuard';
import { LoginPage } from './auth/pages/LoginPage';

import { HomePage } from './pages/home/home';
import { ForgotPasswordPage } from './auth/pages/ForgotPassword';
import { ResetPasswordPage } from './auth/pages/ResetPassword';

function App() {
  const initializeAuth = useAuthStore((s) => s.initializeAuth);
  const isLoading = useAuthStore((s) => s.isLoading);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden font-sans select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-500 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-6 p-8 sm:p-10 rounded-3xl bg-slate-900/50 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.6)] max-w-sm w-full mx-4 text-center">
          
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-indigo-500 border-r-purple-500 animate-spin" />
            
            <div className="absolute w-6 h-6 rounded-full bg-linear-to-tr from-indigo-500 to-pink-500 blur-sm animate-pulse" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-linear-to-r from-white to-slate-300">
              Tizim tekshirilmoqda...
            </h3>
            <p className="text-sm text-slate-400 animate-pulse font-normal">
              Iltimos kuting
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
      <Routes>
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/home" replace /> : <LoginPage />
        } />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route element={<AuthGuard />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
  );
}

export default App;