import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'
import { useAuth } from '../hooks/useAuth'

const navItems = [
  { to: '/', label: '홈', icon: '⌂' },
  { to: '/today', label: '오늘', icon: '▣' },
  { to: '/catalog', label: '대화목록', icon: '○' },
  { to: '/review', label: '복습', icon: '↻' },
  { to: '/records', label: '기록', icon: '▥' },
]

export default function AppLayout() {
  const navigate = useNavigate()
  const { user } = useAuth()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-slate-950">
      <div className="mx-auto min-h-screen w-full max-w-[480px] bg-[#fbfcff] md:border-x md:border-slate-100 md:shadow-[0_0_40px_rgba(15,23,42,0.06)]">
        <header className="bg-white/95">
          <div className="px-5 pb-4 pt-7 sm:px-6 sm:pt-8">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="truncate text-[22px] font-black leading-tight tracking-[-0.05em] text-slate-950 sm:text-[25px]">
                  매일 10분 영어 대화
                </h1>
                <p className="mt-2 truncate text-[14px] font-semibold text-slate-500 sm:text-[15px]">
                  {user?.email ?? '실생활 영어를 매일 부담 없이'}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-[15px] border border-slate-200 bg-white px-3 py-2.5 text-[12px] font-extrabold text-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.04)] sm:px-3.5 sm:text-[13px]"
              >
                <span className="text-base leading-none">↪</span>
                로그아웃
              </button>
            </div>
          </div>
        </header>

        <main tabIndex={-1} className="px-5 pb-28 pt-1 outline-none sm:px-6">
          <Outlet />
        </main>

        <nav className="app-main-bottom-nav fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/80 bg-white/96 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-1.5 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <div className="mx-auto grid w-full max-w-[480px] grid-cols-5 gap-1 px-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex min-w-0 flex-col items-center justify-center rounded-[16px] px-0.5 py-1.5 text-[10px] font-black transition ${
                    isActive ? 'text-indigo-600' : 'text-slate-500 hover:bg-slate-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`grid h-6 w-6 place-items-center text-[22px] leading-none ${
                        isActive ? 'text-indigo-600' : 'text-slate-500'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="mt-0.5 whitespace-nowrap">{item.label}</span>
                    {isActive && <span className="mt-1 h-[3px] w-7 rounded-full bg-indigo-500" />}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}
