import { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Recorder from '../components/Recorder'
import TTSControls from '../components/TTSControls'
import ShadowingMode from '../components/ShadowingMode'
import { supabase } from '../services/supabase'
import { completeStudyOnce } from '../services/study'
import { addReviewOnce } from '../services/review'
import { useAuth } from '../hooks/useAuth'
import type { ConversationWithLines } from '../types/dialogue'
import { useTTS } from '../hooks/useTTS'
import { forceScrollTopAfterRender } from '../utils/scroll'

export default function ConversationPage() {
  const navigate = useNavigate()
  const { id } = useParams()
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
    async function loadConversation() {
      if (!id) return

      setLoading(true)
      const { data } = await supabase
        .from('conversations')
        .select('*, dialogue_lines(*)')
        .eq('id', id)
        .order('line_order', { referencedTable: 'dialogue_lines', ascending: true })
        .single()

      setConversation(data as ConversationWithLines)
      setLoading(false)
    }

    loadConversation()
  }, [id])

  async function completeStudy() {
    if (!user || !conversation) return
    const result = await completeStudyOnce(user.id, conversation.id)
    setMessage(result.message ?? '학습 완료')
  }

  async function addReview() {
    if (!user || !conversation) return
    const result = await addReviewOnce(user.id, conversation.id)
    setMessage(result.message)
  }

  function openTTS() {
    stop()
    setShowShadowing(false)
    setShowRecorder(false)
    setShowTTS((value) => !value)
  }

  function openRecorder() {
    stop()
    setShowShadowing(false)
    setShowTTS(false)
    setShowRecorder((value) => !value)
  }

  function toggleShadowing() {
    stop()
    setShowTTS(false)
    setShowRecorder(false)
    setShowShadowing((value) => !value)
  }

  if (loading || !conversation) {
    return <div className="flex min-h-[50vh] items-center justify-center text-slate-500">불러오는 중...</div>
  }

  const englishLines = conversation.dialogue_lines.map((line) => line.english_text)

  return (
    <section className="pb-28 md:pb-10">
      <div className="rounded-[28px] bg-white p-5 shadow-sm">
        <Link to="/catalog" className="text-xs font-black text-slate-400">← 전체 목록</Link>

        <div className="mt-2 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-blue-500">Daily English</p>
            <h1 className="mt-1 text-[28px] font-black tracking-[-0.06em] text-slate-950">
              {conversation.title}
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">{conversation.situation}</p>
          </div>

          <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600">
            {conversation.dialogue_lines.length}문장
          </div>
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
            <button
              onClick={() => setTab('english')}
              className={`rounded-xl py-3 text-sm font-black ${tab === 'english' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
            >
              영어
            </button>
            <button
              onClick={() => setTab('korean')}
              className={`rounded-xl py-3 text-sm font-black ${tab === 'korean' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
            >
              한글
            </button>
          </div>

          <div className="mt-4 overflow-hidden rounded-[28px] bg-white shadow-sm">
            <div className="divide-y divide-slate-100">
              {conversation.dialogue_lines.map((line) => (
                <div key={line.id} className="grid grid-cols-[34px_1fr_34px] gap-3 px-4 py-4">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${line.speaker === 'A' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {line.speaker}
                  </div>

                  <div>
                    <p className="text-[16px] font-black leading-7 text-slate-950">
                      {tab === 'english' ? line.english_text : line.korean_text}
                    </p>
                  </div>

                  <button
                    onClick={() => speak(line.english_text)}
                    className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-sm"
                  >
                    🔊
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto grid max-w-5xl grid-cols-5 gap-2">
          <button onClick={completeStudy} className="rounded-2xl bg-slate-900 px-2 py-3 text-xs font-black text-white">완료</button>
          <button onClick={addReview} className="rounded-2xl bg-blue-50 px-2 py-3 text-xs font-black text-blue-600">복습</button>
          <button onClick={openTTS} className={`rounded-2xl px-2 py-3 text-xs font-black ${showTTS ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white' : 'bg-slate-100 text-slate-600'}`}>듣기</button>
          <button onClick={openRecorder} className={`rounded-2xl px-2 py-3 text-xs font-black ${showRecorder ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white' : 'bg-slate-100 text-slate-600'}`}>녹음</button>
          <button onClick={toggleShadowing} className={`rounded-2xl px-2 py-3 text-xs font-black ${showShadowing ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white' : 'bg-slate-100 text-slate-600'}`}>쉐도잉</button>
        </div>
      </div>
    </section>
  )
}
