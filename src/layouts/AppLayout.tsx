import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
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
  const location = useLocation()
  const { user } = useAuth()

  // STEP27 FIX:
  // /today 에서만 앱 하단 메뉴 숨김
  const hideBottomNav = location.pathname === '/today'

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
              <h1 className="truncate text-[30px] font-black tracking-[-0.055em] text-slate-950">
                매일 10분 영어 대화
              </h1>
              <p className="mt-3 truncate text-[17px] font-semibold text-slate-500">
                {user?.email ?? '실생활 영어를 매일 부담 없이'}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-[18px] border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-700"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className={`mx-auto max-w-5xl px-5 pt-2 ${hideBottomNav ? 'pb-36' : 'pb-32'}`}>
        <Outlet />
      </main>

      {!hideBottomNav && (
        <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/96 px-2 pb-[max(12px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-2xl">
          <div className="mx-auto grid max-w-5xl grid-cols-6 gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center rounded-[20px] px-1 py-2 text-[11px] font-black ${
                    isActive ? 'text-indigo-600' : 'text-slate-500'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`text-[26px] ${isActive ? 'text-indigo-600' : 'text-slate-500'}`}>
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
      )}
    </div>
  )
}
