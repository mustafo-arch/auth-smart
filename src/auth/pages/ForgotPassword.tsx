// src/auth/pages/ForgotPasswordPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';

export const ForgotPasswordPage = () => {
  const [phone, setPhone] = useState('+998 ');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resetToken, setResetToken] = useState('');
  const navigate = useNavigate();

  // Telefon raqamni formatlash (LoginPage dan nusxa)
  const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    
    if (!digits || digits.length === 0) {
      return '+998 ';
    }
    
    let remainingDigits = digits;
    if (digits.startsWith('998')) {
      remainingDigits = digits.slice(3);
    } else if (digits.startsWith('9')) {
      remainingDigits = digits;
    }
    
    remainingDigits = remainingDigits.slice(0, 9);
    
    let result = '+998 ';
    
    if (remainingDigits.length > 0) {
      result += '(' + remainingDigits.slice(0, 2);
      if (remainingDigits.length >= 2) {
        result += ') ';
      }
    }
    
    if (remainingDigits.length > 2) {
      result += remainingDigits.slice(2, 5);
    }
    
    if (remainingDigits.length > 5) {
      result += '-' + remainingDigits.slice(5, 7);
    }
    
    if (remainingDigits.length > 7) {
      result += '-' + remainingDigits.slice(7, 9);
    }
    
    return result;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formatted = formatPhoneNumber(inputValue);
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setResetToken('');

    // Telefon raqamni tozalash
    const phoneDigits = '+' + phone.replace(/\D/g, '');
    
    // Validatsiya
    if (phoneDigits.length < 13) {
      setError('Telefon raqam noto\'g\'ri formatda');
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.forgotPassword(phoneDigits);
      setSuccess(response.message);
      
      // Backend hozircha tokenni ham qaytaradi
      if (response.resetToken) {
        setResetToken(response.resetToken);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        'Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleContinueToReset = () => {
    if (resetToken) {
      navigate(`/reset-password?token=${resetToken}`);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 relative overflow-hidden font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 mx-4 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.6)] transition-all duration-300">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30 mb-4">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white via-slate-200 to-slate-400 tracking-tight">
            Parolni tiklash
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Telefon raqamingizni kiriting va tiklash kodini oling
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-slate-300 ml-1">
              Telefon raqam
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none group-focus-within:text-indigo-400 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <input 
                type="tel"
                placeholder="+998 (90) 000-00-00"
                className="w-full pl-11 pr-4 py-3 bg-slate-800/40 border border-slate-700/60 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
                value={phone} 
                onChange={handlePhoneChange}
                required 
              />
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{success}</span>
            </div>
          )}

          {/* Reset Token display */}
          {resetToken && (
            <div className="bg-blue-500/10 border border-blue-500/30 text-blue-400 px-4 py-3 rounded-xl text-sm">
              <p className="font-semibold mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Tiklash kodi:
              </p>
              <div className="bg-slate-800/60 rounded-lg p-3 font-mono text-base select-all break-all">
                {resetToken}
              </div>
              <button
                type="button"
                onClick={handleContinueToReset}
                className="mt-3 w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span>Yangi parol o'rnatish</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-2 py-3.5 px-6 rounded-xl text-white font-semibold shadow-lg shadow-indigo-500/25 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Yuborilmoqda...</span>
              </>
            ) : (
              <>
                <span>Kod olish</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-slate-800/80 pt-4">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            ← Login sahifasiga qaytish
          </button>
        </div>
      </div>
    </div>
  );
};