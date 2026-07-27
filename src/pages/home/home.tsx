import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../auth/store/authStore';

export const HomePage = () => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 relative overflow-hidden font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      <div className="absolute top-0 right-1/4 w-125 h-125 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-125 h-125 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      <header className="relative z-10 w-full bg-slate-900/40 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-md shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-slate-200 to-slate-400">
            Home Sahifasi
          </h1>
        </div>

        <button
          onClick={handleLogout}
          className="hidden sm:inline-flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-rose-300 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 hover:border-rose-500/30 active:scale-95 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Chiqish</span>
        </button>
      </header>

      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto p-6 sm:p-10 flex flex-col justify-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Asosiy Panel</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Xush kelibsiz, {user?.phone}!
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium self-start sm:self-center">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              <span>Sizning rolingiz: <strong className="text-white uppercase tracking-wider ml-1">{user?.role}</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 border border-slate-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-medium">Telefon Raqam</p>
                <p className="text-base font-semibold text-white mt-0.5">{user?.phone}</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-purple-400 border border-slate-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-medium">Foydalanuvchi Rolining Darajasi</p>
                <p className="text-base font-semibold text-white mt-0.5 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex justify-end">
            <button 
              onClick={handleLogout}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full cursor-pointer text-white font-semibold bg-linear-to-r from-rose-600 via-red-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-lg shadow-rose-600/25 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};