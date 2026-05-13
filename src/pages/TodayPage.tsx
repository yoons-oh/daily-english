import { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Recorder from '../components/Recorder'
import TTSControls from '../components/TTSControls'
import ShadowingMode from '../components/ShadowingMode'
import { supabase } from '../services/supabase'
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
      forceScrollTopAfterRender()
      return
    }

    if (result.status === 'already_completed') {
      const goHome = window.confirm('이미 저장한 학습입니다. 홈으로 돌아가겠습니까?')
      if (goHome) navigate('/')
      else {
        setMessage('이미 오늘 학습 완료된 대화입니다.')
        forceScrollTopAfterRender()
      }
      return
    }

    setMessage(result.message)
    forceScrollTopAfterRender()
  }

  async function addReview() {
    if (!user || !conversation) return

    const result = await addReviewOnce(user.id, conversation.id)

    if (result.status === 'already_exists') {
      const goHome = window.confirm('이미 복습 목록에 있습니다. 홈으로 돌아가겠습니까?')
      if (goHome) navigate('/')
      else {
        setMessage(result.message)
        forceScrollTopAfterRender()
      }
      return
    }

    setMessage(result.message)
    forceScrollTopAfterRender()
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
    return (
      <div className="flex min-h-[55vh] items-center justify-center">
        <p className="text-sm text-slate-500">오늘의 고정 학습을 불러오는 중...</p>
      </div>
    )
  }

  if (!conversation) {
    return (
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">오늘의 학습이 없습니다</h2>
        <p className="mt-2 text-slate-600">{message || 'Supabase 데이터를 확인해주세요.'}</p>
      </section>
    )
  }

  const englishLines = conversation.dialogue_lines.map((line) => line.english_text)

  return (
    <section className="pb-28 md:pb-8">
      <div className="sticky top-[73px] z-10 -mx-4 border-b border-slate-100 bg-slate-50/95 px-4 pb-3 pt-1 backdrop-blur md:static md:mx-0 md:border-0 md:bg-transparent md:px-0 md:pb-4">
        <div className="rounded-2xl bg-white px-4 py-3 shadow-sm md:rounded-3xl md:px-6 md:py-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-400">오늘의 고정 학습</p>
              <h2 className="mt-0.5 truncate text-lg font-extrabold text-slate-900 md:text-2xl">
                {conversation.title}
              </h2>
              <p className="mt-1 line-clamp-1 text-xs text-slate-500 md:text-sm">
                오늘 하루는 이 대화가 계속 표시됩니다.
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">
              {conversation.dialogue_lines.length}턴
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
            <button
              onClick={() => setTab('english')}
              className={`rounded-xl py-2.5 text-sm font-bold ${
                tab === 'english' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              영어
            </button>
            <button
              onClick={() => setTab('korean')}
              className={`rounded-xl py-2.5 text-sm font-bold ${
                tab === 'korean' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              한글
            </button>
          </div>
        </div>
      </div>

      {showTTS && (
        <div className="mb-3 mt-3">
          <TTSControls lines={englishLines} />
        </div>
      )}

      {showShadowing && (
        <div className="mb-3 mt-3">
          <ShadowingMode lines={conversation.dialogue_lines} />
        </div>
      )}

      {!showShadowing && (
        <div className="mt-3 overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="divide-y divide-slate-100">
            {conversation.dialogue_lines.map((line) => (
              <div
                key={line.id}
                className="grid grid-cols-[34px_1fr_34px] gap-2 px-3 py-3 md:grid-cols-[48px_1fr_42px] md:gap-3 md:px-6 md:py-4"
              >
                <div
                  className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold md:h-9 md:w-9 md:text-sm ${
                    line.speaker === 'A'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {line.speaker}
                </div>

                <p className="pt-0.5 text-[15px] font-semibold leading-6 text-slate-900 md:text-xl md:leading-8">
                  {tab === 'english' ? line.english_text : line.korean_text}
                </p>

                <button
                  onClick={() => speak(line.english_text)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600"
                  title="문장 듣기"
                >
                  🔊
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {message && (
        <div className="mt-3 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm">
          {message}
        </div>
      )}

      {showRecorder && (
        <div className="mt-4">
          <Recorder compact />
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-8px_20px_rgba(15,23,42,0.06)] backdrop-blur md:static md:mt-5 md:rounded-3xl md:border md:shadow-sm">
        <div className="mx-auto grid max-w-5xl grid-cols-5 gap-2">
          <button onClick={completeStudy} className="rounded-2xl bg-slate-900 px-2 py-3 text-xs font-extrabold text-white md:text-sm">
            완료
          </button>
          <button onClick={addReview} className="rounded-2xl bg-slate-100 px-2 py-3 text-xs font-extrabold text-slate-700 md:text-sm">
            복습
          </button>
          <button
            onClick={openTTS}
            className="rounded-2xl bg-slate-100 px-2 py-3 text-xs font-extrabold text-slate-700 md:text-sm"
          >
            듣기
          </button>
          <button
            onClick={openRecorder}
            className="rounded-2xl bg-slate-100 px-2 py-3 text-xs font-extrabold text-slate-700 md:text-sm"
          >
            녹음
          </button>
          <button
            onClick={toggleShadowing}
            className={`rounded-2xl px-2 py-3 text-xs font-extrabold md:text-sm ${
              showShadowing ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            쉐도잉
          </button>
        </div>

        {tab === 'korean' && !showShadowing && (
          <button
            onClick={() => {
              setTab('english')
              forceScrollTopAfterRender()
            }}
            className="mx-auto mt-2 block w-full max-w-5xl rounded-2xl bg-slate-50 px-3 py-2 text-sm font-bold text-slate-500"
          >
            기억이 안 나면 영어로 다시 보기
          </button>
        )}
      </div>
    </section>
  )
}
