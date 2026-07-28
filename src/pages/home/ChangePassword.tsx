import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../auth/api/authApi';
import { useAuthStore } from '../../auth/store/authStore';

// Ikonkalar uchun komponentlar (kodni toza saqlash uchun)
const EyeIcon = () => (
  <svg className="w-5 h-5 text-slate-400 hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg className="w-5 h-5 text-slate-400 hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

export const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Har bir input uchun alohida visibility state
  const [visibility, setVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = (field: keyof typeof visibility) => {
    setVisibility(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Yangi parollar mos kelmadi');
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('Yangi parol kamida 8 ta belgidan iborat bo\'lishi kerak');
      return;
    }

    setIsLoading(true);
    try {
      await authApi.changePassword(formData.currentPassword, formData.newPassword);
      
      await logout(); 
      navigate('/', { replace: true });
    } catch (err: unknown) {
      const msg = 'Parolni o\'zgartirishda xatolik yuz berdi';
      console.log(err);
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Input maydonini qayta ishlatish uchun helper funksiya
  const renderPasswordField = (
    label: string, 
    field: keyof typeof formData, 
    visKey: keyof typeof visibility,
    placeholder: string
  ) => (
    <div>
      <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">{label}</label>
      <div className="relative">
        <input
          type={visibility[visKey] ? 'text' : 'password'}
          required
          minLength={field === 'currentPassword' ? undefined : 8}
          value={formData[field]}
          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-indigo-500 focus:outline-none transition-colors"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => toggleVisibility(visKey)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
          tabIndex={-1}
        >
          {visibility[visKey] ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <h2 className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-purple-400">
          Parolni o'zgartirish
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {renderPasswordField('Joriy parol', 'currentPassword', 'current', '••••••••')}
          {renderPasswordField('Yangi parol', 'newPassword', 'new', 'Kamida 8 ta belgi')}
          {renderPasswordField('Yangi parolni tasdiqlang', 'confirmPassword', 'confirm', 'Parolni qayta kiriting')}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="flex-1 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all cursor-pointer"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/25 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? 'O\'zgartirilmoqda...' : 'Saqlash'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};