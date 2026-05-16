import { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Recorder from '../components/Recorder'
import TTSControls from '../components/TTSControls'
import ShadowingMode from '../components/ShadowingMode'
import { completeStudyOnce } from '../services/study'
import { addReviewOnce } from '../services/review'
import { useAuth } from '../hooks/useAuth'
import type { ConversationWithLines } from '../types/dialogue'
import { getTodayRecommendedConversation } from '../services/conversations'
import { useTTS } from '../hooks/useTTS'
import { forceScrollTopAfterRender } from '../utils/scroll'

export default function TodayPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [tab, setTab] = useState<'english' | 'korean'>('english')
  const [conversation, setConversation] = useState<ConversationWithLines | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [showRecorder, setShowRecorder] = useState(false)
  const [showTTS, setShowTTS] = useState(false)
  const [showShadowing, setShowShadowing] = useState(false)
  const { speak, stop } = useTTS()

  useLayoutEffect(() => {
    forceScrollTopAfterRender()
  }, [])

  useEffect(() => {
    async function loadTodayConversation() {
      if (!user) return
      setLoading(true)
      setMessage('')

      try {
        const recommended = await getTodayRecommendedConversation(user.id)
        setConversation(recommended)
      } catch (error) {
        setMessage(error instanceof Error ? error.message : '오늘의 학습을 불러오지 못했어요.')
      } finally {
        setLoading(false)
        forceScrollTopAfterRender()
      }
    }

    loadTodayConversation()
  }, [user])

  async function completeStudy() {
    if (!user || !conversation) return
    const result = await completeStudyOnce(user.id, conversation.id)

    if (result.status === 'created') {
      setMessage('학습 완료! 기록에 저장했어요.')
      return
    }

    if (result.status === 'already_completed') {
      const goHome = window.confirm('이미 저장한 학습입니다. 홈으로 돌아가겠습니까?')
      if (goHome) navigate('/')
      else setMessage('이미 오늘 학습 완료된 대화입니다.')
      return
    }

    setMessage(result.message)
  }

  async function addReview() {
    if (!user || !conversation) return
    const result = await addReviewOnce(user.id, conversation.id)

    if (result.status === 'already_exists') {
      const goHome = window.confirm('이미 복습 목록에 있습니다. 홈으로 돌아가겠습니까?')
      if (goHome) navigate('/')
      else setMessage(result.message)
      return
    }

    setMessage(result.message)
  }

  function openTTS() {
    stop()
    setShowShadowing(false)
    setShowRecorder(false)
    setShowTTS((value) => !value)
    forceScrollTopAfterRender()
  }

  function openRecorder() {
    stop()
    setShowShadowing(false)
    setShowTTS(false)
    setShowRecorder((value) => !value)
    forceScrollTopAfterRender()
  }

  function toggleShadowing() {
    stop()
    setShowTTS(false)
    setShowRecorder(false)
    setShowShadowing((value) => !value)
    forceScrollTopAfterRender()
  }

  if (loading) {
    return <div className="flex min-h-[50vh] items-center justify-center text-sm text-slate-500">오늘의 고정 학습을 불러오는 중...</div>
  }

  if (!conversation) {
    return (
      <section className="rounded-[28px] bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black">오늘의 학습이 없습니다</h2>
        <p className="mt-2 text-slate-500">{message || 'Supabase 데이터를 확인해주세요.'}</p>
      </section>
    )
  }

  const englishLines = conversation.dialogue_lines.map((line) => line.english_text)

  return (
    <section className="pb-28 md:pb-10">
      <div className="rounded-[28px] bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-black text-blue-500">오늘의 고정 학습</p>
            <h1 className="mt-1 truncate text-[28px] font-black tracking-[-0.06em] text-slate-950">
              {conversation.title}
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">오늘 하루는 이 대화가 계속 표시됩니다.</p>
          </div>
          <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600">
            {conversation.dialogue_lines.length}문장
          </span>
        </div>
      </div>

      {showRecorder && !showShadowing && (
        <div className="mt-4">
          <Recorder compact />
        </div>
      )}

      {showTTS && (
        <div className="mt-4">
          <TTSControls lines={englishLines} title={conversation.title} situation={conversation.situation} />
        </div>
      )}

      {showShadowing && (
        <div className="mt-4">
          <ShadowingMode lines={conversation.dialogue_lines} />
        </div>
      )}

      {!showShadowing && (
        <>
          <div className="mt-4 grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
            <button onClick={() => setTab('english')} className={`rounded-xl py-3 text-sm font-black ${tab === 'english' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>영어</button>
            <button onClick={() => setTab('korean')} className={`rounded-xl py-3 text-sm font-black ${tab === 'korean' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>한글</button>
          </div>

          <div className="mt-4 overflow-hidden rounded-[28px] bg-white shadow-sm">
            <div className="divide-y divide-slate-100">
              {conversation.dialogue_lines.map((line) => (
                <div key={line.id} className="grid grid-cols-[34px_1fr_34px] gap-3 px-4 py-4">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${line.speaker === 'A' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>{line.speaker}</div>
                  <p className="text-[16px] font-black leading-7 text-slate-950">{tab === 'english' ? line.english_text : line.korean_text}</p>
                  <button onClick={() => speak(line.english_text)} className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-sm" title="문장 듣기">🔊</button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {message && <div className="mt-3 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">{message}</div>}

      <div className="fixed inset-x-0 bottom-[72px] z-30 px-3 md:bottom-0">
        <div className="mx-auto max-w-[480px] rounded-[24px] border border-slate-200 bg-white/95 p-2 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur md:rounded-b-none">
          <div className="grid grid-cols-5 gap-2">
            <button onClick={completeStudy} className="rounded-2xl bg-slate-900 px-1 py-3 text-[11px] font-black text-white">완료</button>
            <button onClick={addReview} className="rounded-2xl bg-blue-50 px-1 py-3 text-[11px] font-black text-blue-600">복습</button>
            <button onClick={openTTS} className={`rounded-2xl px-1 py-3 text-[11px] font-black ${showTTS ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white' : 'bg-slate-100 text-slate-600'}`}>듣기</button>
            <button onClick={openRecorder} className={`rounded-2xl px-1 py-3 text-[11px] font-black ${showRecorder ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white' : 'bg-slate-100 text-slate-600'}`}>녹음</button>
            <button onClick={toggleShadowing} className={`rounded-2xl px-1 py-3 text-[11px] font-black ${showShadowing ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white' : 'bg-slate-100 text-slate-600'}`}>쉐도잉</button>
          </div>
        </div>
      </div>
    </section>
  )
}
