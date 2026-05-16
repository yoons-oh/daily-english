import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'
import { useAuth } from '../hooks/useAuth'

const navItems = [
  { to: '/', label: '홈', icon: '⌂' },
  { to: '/today', label: '오늘', icon: '▣' },
  { to: '/catalog', label: '대화목록', icon: '○' },
  { to: '/conversation/new', label: '대화추가', icon: '+' },
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
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <div className="mx-auto min-h-screen w-full max-w-[480px] bg-[#fbfcff] shadow-none md:border-x md:border-slate-100 md:shadow-[0_0_40px_rgba(15,23,42,0.06)]">
        <header className="bg-white/95">
          <div className="px-5 pb-5 pt-8 sm:px-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="truncate text-[25px] font-black leading-tight tracking-[-0.055em] text-slate-950 sm:text-[28px]">
                  매일 10분 영어 대화
                </h1>
                <p className="mt-2 truncate text-[15px] font-semibold text-slate-500 sm:text-[16px]">
                  {user?.email ?? '실생활 영어를 매일 부담 없이'}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-[16px] border border-slate-200 bg-white px-3.5 py-2.5 text-[13px] font-extrabold text-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.04)] sm:px-4 sm:text-sm"
              >
                <span className="text-lg leading-none">↪</span>
                로그아웃
              </button>
            </div>
          </div>
        </header>

        <main tabIndex={-1} className="px-5 pb-36 pt-2 outline-none sm:px-6">
          <Outlet />
        </main>

        <nav className="app-main-bottom-nav fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/80 bg-white/96 px-2 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <div className="mx-auto grid w-full max-w-[480px] grid-cols-6 gap-1 px-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex min-w-0 flex-col items-center justify-center rounded-[18px] px-0.5 py-2 text-[10px] font-black transition sm:text-[11px] ${
                    isActive ? 'text-indigo-600' : 'text-slate-500 hover:bg-slate-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`grid h-7 w-7 place-items-center text-[24px] leading-none sm:h-8 sm:w-8 ${
                        isActive ? 'text-indigo-600' : 'text-slate-500'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="mt-1 whitespace-nowrap">{item.label}</span>
                    {isActive && <span className="mt-1 h-[3px] w-8 rounded-full bg-indigo-500" />}
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
