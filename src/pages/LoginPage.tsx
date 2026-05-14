import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

export default function LoginPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    const authAction =
      mode === 'login'
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password })

    const { error } = await authAction

    setLoading(false)

    if (error) {
      setMessage(error.message)
      return
    }

    if (mode === 'signup') {
      setMessage('회원가입이 완료되었습니다. 이메일 확인이 필요한 경우 메일함을 확인해주세요.')
      return
    }

    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef4ff] via-[#f8fbff] to-[#fbfcff] px-5 py-8 text-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col justify-center">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-[28px] bg-gradient-to-br from-indigo-500 to-blue-500 text-4xl text-white shadow-[0_18px_40px_rgba(79,70,229,0.28)]">
            💬
          </div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-indigo-500">
            Daily English
          </p>
          <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.06em]">
            매일 10분
            <br />
            영어 대화
          </h1>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">
            실제 대화체 영어를 읽고, 듣고,
            <br />
            따라 말하며 복습하세요.
          </p>
        </div>

        <div className="rounded-[34px] border border-white/80 bg-white p-6 shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
          <div className="mb-5 grid grid-cols-2 rounded-[22px] bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => {
                setMode('login')
                setMessage('')
              }}
              className={`rounded-[18px] px-4 py-3 text-sm font-black transition ${
                mode === 'login'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500'
              }`}
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup')
                setMessage('')
              }}
              className={`rounded-[18px] px-4 py-3 text-sm font-black transition ${
                mode === 'signup'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500'
              }`}
            >
              회원가입
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-sm font-black text-slate-600">이메일</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                placeholder="example@email.com"
                className="mt-2 w-full rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-base font-semibold text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </label>

            <label className="block">
              <span className="text-sm font-black text-slate-600">비밀번호</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                placeholder="비밀번호를 입력하세요"
                className="mt-2 w-full rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-base font-semibold text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </label>

            {message && (
              <div className="rounded-[20px] bg-slate-950 px-4 py-3 text-sm font-bold leading-6 text-white">
                {message}
              </div>
            )}

            <button
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center rounded-[24px] bg-gradient-to-r from-indigo-600 to-blue-500 px-5 py-4 text-base font-black text-white shadow-[0_14px_30px_rgba(79,70,229,0.26)] disabled:opacity-60"
            >
              {loading ? '처리 중...' : mode === 'login' ? '로그인하기' : '회원가입하기'}
            </button>
          </form>

          <p className="mt-5 text-center text-xs font-semibold leading-5 text-slate-400">
            로그인하면 오늘의 대화, 복습 기록,
            <br />
            쉐도잉 학습 기록을 저장할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  )
}
