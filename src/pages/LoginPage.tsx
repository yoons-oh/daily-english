import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

export default function LoginPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    const result =
      mode === 'login'
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password })

    setLoading(false)

    if (result.error) {
      setMessage(result.error.message)
      return
    }

    if (mode === 'signup') {
      setMessage('회원가입이 완료되었습니다. 이메일 확인 설정이 켜져 있다면 메일 인증 후 로그인하세요.')
      return
    }

    navigate('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-slate-500">Daily English</p>
        <h1 className="mt-2 text-2xl font-bold">
          {mode === 'login' ? '로그인' : '회원가입'}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          매일 10분, 실제 대화체 영어를 읽고 복습하세요.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            className="input"
            placeholder="이메일"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            className="input"
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
          />
          <button disabled={loading} className="button-primary w-full disabled:opacity-50">
            {loading ? '처리 중...' : mode === 'login' ? '로그인' : '회원가입'}
          </button>
        </form>

        {message && (
          <div className="mt-4 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
            {message}
          </div>
        )}

        <button
          onClick={() => {
            setMode(mode === 'login' ? 'signup' : 'login')
            setMessage('')
          }}
          className="mt-5 text-sm font-semibold text-slate-600"
        >
          {mode === 'login' ? '계정이 없나요? 회원가입' : '이미 계정이 있나요? 로그인'}
        </button>
      </div>
    </div>
  )
}
