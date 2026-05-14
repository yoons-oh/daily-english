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
    <div className="min-h-screen bg-[#fbfcff] text-slate-950">
      <header className="bg-white/95">
        <div className="mx-auto max-w-5xl px-5 pb-5 pt-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="truncate text-[30px] font-black leading-none tracking-[-0.055em] text-slate-950 md:text-4xl">
                매일 10분 영어 대화
              </h1>
              <p className="mt-3 truncate text-[17px] font-semibold text-slate-500 md:text-xl">
                {user?.email ?? '실생활 영어를 매일 부담 없이'}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex shrink-0 items-center gap-2 rounded-[18px] border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.04)] md:px-5 md:text-base"
            >
              <span className="text-xl leading-none">↪</span>
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main tabIndex={-1} className="mx-auto max-w-5xl px-5 pb-32 pt-2 outline-none">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/80 bg-white/96 px-2 pb-[max(12px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
        <div className="mx-auto grid max-w-5xl grid-cols-6 gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex min-w-0 flex-col items-center justify-center rounded-[20px] px-1 py-2 text-[11px] font-black transition md:text-sm ${
                  isActive ? 'text-indigo-600' : 'text-slate-500 hover:bg-slate-50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`grid h-8 w-8 place-items-center text-[26px] leading-none md:h-9 md:w-9 ${
                      isActive ? 'text-indigo-600' : 'text-slate-500'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="mt-1 whitespace-nowrap">{item.label}</span>
                  {isActive && <span className="mt-1 h-[3px] w-9 rounded-full bg-indigo-500" />}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
