import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'
import { useAuth } from '../hooks/useAuth'

const navItems = [
  { to: '/', label: '홈', icon: '⌂' },
  { to: '/today', label: '오늘', icon: '▣' },
  { to: '/catalog', label: '대화목록', icon: '◌' },
  { to: '/conversation/new', label: '추가', icon: '+' },
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
    <div className="min-h-screen bg-[#f5f8ff] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-4">
          <div className="min-w-0">
            <h1 className="truncate text-xl font-black tracking-[-0.04em] text-slate-950 md:text-2xl">
              매일 10분 영어 대화
            </h1>
            <p className="mt-0.5 truncate text-sm font-semibold text-slate-400">
              {user?.email ?? '실생활 영어를 매일 부담 없이'}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="hidden shrink-0 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-600 shadow-sm transition hover:bg-slate-50 md:inline-flex"
          >
            <span className="text-lg">↪</span>
            로그아웃
          </button>
        </div>
      </header>

      <main tabIndex={-1} className="mx-auto max-w-5xl px-4 pb-28 pt-5 outline-none md:px-5 md:pb-10">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/70 bg-white/95 px-2 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_30px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-6 gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center rounded-2xl px-1 py-2 text-[11px] font-extrabold transition ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-500 active:bg-slate-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`mb-1 flex h-8 w-8 items-center justify-center rounded-2xl text-xl leading-none transition ${
                      isActive
                        ? 'bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-500/25'
                        : 'bg-transparent text-slate-500'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="whitespace-nowrap">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      <aside className="hidden border-t border-slate-100 bg-white/80 px-4 py-3 backdrop-blur-xl md:block">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-extrabold transition ${
                  isActive
                    ? 'bg-slate-950 text-white shadow-lg shadow-slate-900/10'
                    : 'text-slate-500 hover:bg-slate-100'
                }`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
      </aside>
    </div>
  )
}
