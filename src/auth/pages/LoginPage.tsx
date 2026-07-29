import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

export const LoginPage = () => {
  const [phone, setPhone] = useState('+998 ');
  const [password, setPassword] = useState('SuperAdmin123!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    if (useAuthStore.getState().isAuthenticated) {
      navigate('/home');
    } else {
      Cookies.remove('refresh_token', { path: '/' });
    }
  }, [navigate]);

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const phoneDigits = '+' + phone.replace(/\D/g, '');
      const data = await authApi.login(phoneDigits, password);
      setAuth({ user: data.user, accessToken: data.accessToken });
      navigate('/home');
    } catch (err: unknown) {
      console.log(err);
      
      let errorMessage = 'Login yoki parol noto\'g\'ri!';
      
      if (err && typeof err === 'object' && 'message' in err) {
        errorMessage = (err as any).message || errorMessage;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 relative overflow-hidden font-sans selection:bg-indigo-500 selection:text-white">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 mx-4 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.6)] transition-all duration-300">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30 mb-4">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white via-slate-200 to-slate-400 tracking-tight">
            Tizimga kirish
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Xush kelibsiz! Tizimga kirish uchun ma'lumotlaringizni kiriting.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
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

          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-slate-300 ml-1">
              Parol
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3 bg-slate-800/40 border border-slate-700/60 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

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
                <span>Kirilmoqda...</span>
              </>
            ) : (
              <>
                <span>Kirish</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Parolni unutdingizmi?
            </button>
          </div>
        </form>

        <div className="mt-8 text-center border-t border-slate-800/80 pt-4">
          <p className="text-xs text-slate-500">
            🔒 Xavfsiz va shifrlangan ulanish
          </p>
        </div>
      </div>
    </div>
  );
};