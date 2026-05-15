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

    // Prevent duplicate submit requests
    if (loading) return

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
}
