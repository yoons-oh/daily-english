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
    <div className="min-h-screen bg-[#f7f9ff] text-slate-950">
      <header className="border-b border-slate-100 bg-white/96">
        <div className="mx-auto max-w-5xl px-5 pb-4 pt-7">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="truncate text-[30px] font-black leading-none tracking-[-0.055em] text-slate-950 md:text-4xl">
                매일 10분 영어 대화
              </h1>
              <p className="mt-3 truncate text-[17px] font-medium text-slate-500 md:text-xl">
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

          <nav className="mt-6 rounded-[26px] border border-slate-200/70 bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
            <div className="grid grid-cols-6 gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `relative flex min-w-0 flex-col items-center justify-center rounded-[20px] px-1 py-3 text-[12px] font-black transition md:text-sm ${
                      isActive ? 'text-indigo-600' : 'text-slate-500 hover:bg-slate-50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`grid h-12 w-12 place-items-center rounded-full text-[26px] leading-none transition md:h-14 md:w-14 ${
                          isActive
                            ? 'bg-indigo-50 text-indigo-600 shadow-[0_8px_18px_rgba(79,70,229,0.15)]'
                            : 'text-slate-500'
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="mt-2 whitespace-nowrap">{item.label}</span>
                      {isActive && (
                        <span className="absolute bottom-0 h-[3px] w-10 rounded-full bg-indigo-500" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main tabIndex={-1} className="mx-auto max-w-5xl px-5 pb-10 pt-6 outline-none">
        <Outlet />
      </main>
    </div>
  )
}
