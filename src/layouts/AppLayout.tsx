import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'
import { useAuth } from '../hooks/useAuth'

const navItems = [
  { to: '/', label: '홈' },
  { to: '/today', label: '오늘' },
  { to: '/catalog', label: '대화목록' },
  { to: '/conversation/new', label: '대화추가' },
  { to: '/review', label: '복습' },
  { to: '/records', label: '기록' },
]

export default function AppLayout() {
  const navigate = useNavigate()
  const { user } = useAuth()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-base font-extrabold md:text-lg">매일 10분 영어 대화</h1>
            <p className="text-xs text-slate-500">
              {user?.email ? `${user.email}` : '실생활 영어를 매일 부담 없이'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <nav className="flex gap-1 overflow-x-auto text-sm">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `whitespace-nowrap rounded-full px-3 py-2 ${
                      isActive
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <button
              onClick={handleLogout}
              className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main tabIndex={-1} className="mx-auto max-w-5xl px-4 py-5 outline-none">
        <Outlet />
      </main>
    </div>
  )
}
