import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'
import { useAuth } from '../hooks/useAuth'

const navItems = [
  { to: '/', label: '홈', icon: '🏠' },
  { to: '/today', label: '오늘', icon: '📘' },
  { to: '/catalog', label: '목록', icon: '💬' },
  { to: '/conversation/new', label: '추가', icon: '＋' },
  { to: '/review', label: '복습', icon: '🔁' },
  { to: '/records', label: '기록', icon: '📊' },
]

export default function AppLayout() {
  const navigate = useNavigate()
  const { user } = useAuth()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef4ff] via-[#f7f9ff] to-[#f8fafc] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-white/70 bg-white/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 md:px-5">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-black text-indigo-600">
                UI v22.2
              </span>
              <p className="truncate text-xs font-bold text-slate-400">Daily English</p>
            </div>
            <h1 className="mt-1 truncate text-xl font-black tracking-[-0.05em] text-slate-950 md:text-2xl">
              매일 10분 영어 대화
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="shrink-0 rounded-2xl bg-slate-950 px-4 py-2.5 text-xs font-black text-white shadow-lg shadow-slate-900/15 md:px-5 md:py-3 md:text-sm"
          >
            로그아웃
          </button>
        </div>
      </header>

      <main tabIndex={-1} className="mx-auto max-w-5xl px-4 pb-28 pt-5 outline-none md:px-5 md:pb-24">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(12px,env(safe-area-inset-bottom))] md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-6 gap-1 rounded-[30px] border border-white/80 bg-white/92 p-2 shadow-[0_-18px_45px_rgba(15,23,42,0.16)] backdrop-blur-2xl">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex min-w-0 flex-col items-center justify-center rounded-[22px] px-1 py-2 text-[10px] font-black transition ${
                  isActive
                    ? 'bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-500/25'
                    : 'text-slate-500 active:bg-slate-100'
                }`
              }
            >
              <span className="text-[20px] leading-none">{item.icon}</span>
              <span className="mt-1 whitespace-nowrap">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <aside className="fixed inset-x-0 bottom-0 z-40 hidden border-t border-white/70 bg-white/88 px-4 py-3 shadow-[0_-12px_35px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:block">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-black transition ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-500/20'
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
