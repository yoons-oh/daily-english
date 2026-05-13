import { useEffect, useRef, useState } from 'react'
import type { DialogueLine } from '../types/dialogue'

type ShadowingModeProps = {
  lines: DialogueLine[]
}

type Phase = 'idle' | 'listening' | 'waiting' | 'recording' | 'moving' | 'done'

const RECORD_SECONDS = 5
const WAIT_MS = 300

export default function ShadowingMode({ lines }: ShadowingModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('idle')
  const [audioUrls, setAudioUrls] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('시작하면 현재 문장을 듣고, 5초 동안 자동 녹음합니다.')

  const currentIndexRef = useRef(0)
  const runningRef = useRef(false)
  const stoppedRef = useRef(false)
  const timerRef = useRef<number | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const lineRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const audioUrlsRef = useRef<Record<string, string>>({})

  useEffect(() => {
    currentIndexRef.current = currentIndex
  }, [currentIndex])

  useEffect(() => {
    audioUrlsRef.current = audioUrls
  }, [audioUrls])

  useEffect(() => {
    return () => {
      hardStop()
      Object.values(audioUrlsRef.current).forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  function clearTimer() {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  function setSingleTimer(callback: () => void, delay: number) {
    clearTimer()
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null
      callback()
    }, delay)
  }

  function stopStream() {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }

  function stopRecordingIfNeeded() {
    const recorder = mediaRecorderRef.current
    if (recorder && recorder.state === 'recording') {
      recorder.stop()
    }
  }

  function hardStop() {
    stoppedRef.current = true
    runningRef.current = false
    clearTimer()
    window.speechSynthesis.cancel()
    stopRecordingIfNeeded()
    stopStream()
  }

  function scrollToCurrentLine(lineId: string) {
    const node = lineRefs.current[lineId]
    if (!node) return
    node.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  function speakOnce(text: string) {
    return new Promise<void>((resolve) => {
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.9
      utterance.pitch = 1

      let resolved = false
      const finish = () => {
        if (resolved) return
        resolved = true
        resolve()
      }

      utterance.onend = finish
      utterance.onerror = finish
      window.speechSynthesis.speak(utterance)
    })
  }

  async function startRecording(line: DialogueLine) {
    if (stoppedRef.current) return

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      if (stoppedRef.current) {
        stream.getTracks().forEach((track) => track.stop())
        return
      }

      streamRef.current = stream
      chunksRef.current = []

      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data)
      }

      recorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(audioBlob)

        setAudioUrls((prev) => {
          if (prev[line.id]) URL.revokeObjectURL(prev[line.id])
          return { ...prev, [line.id]: url }
        })

        stopStream()
      }

      setPhase('recording')
      setMessage(`따라 읽는 중입니다. ${RECORD_SECONDS}초 동안 녹음돼요.`)
      recorder.start()

      setSingleTimer(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          mediaRecorderRef.current.stop()
        }

        if (stoppedRef.current) return

        setPhase('moving')
        setMessage('녹음 완료. 다음 문장으로 넘어갑니다.')

        setSingleTimer(() => {
          moveToNext()
        }, WAIT_MS)
      }, RECORD_SECONDS * 1000)
    } catch {
      hardStop()
      setPhase('idle')
      setMessage('마이크 권한을 허용해야 쉐도잉을 할 수 있어요.')
    }
  }

  async function runLine(index: number) {
    if (stoppedRef.current) return

    const line = lines[index]
    if (!line) {
      finishAll()
      return
    }

    currentIndexRef.current = index
    setCurrentIndex(index)

    window.requestAnimationFrame(() => {
      scrollToCurrentLine(line.id)
    })

    setPhase('listening')
    setMessage('영어 문장을 한 번 듣습니다.')

    await speakOnce(line.english_text)

    if (stoppedRef.current) return

    setPhase('waiting')
    setMessage('0.3초 후 자동 녹음이 시작됩니다.')

    setSingleTimer(() => {
      startRecording(line)
    }, WAIT_MS)
  }

  function startShadowing() {
    if (runningRef.current) return

    stoppedRef.current = false
    runningRef.current = true
    clearTimer()
    window.speechSynthesis.cancel()
    runLine(currentIndexRef.current)
  }

  function moveToNext() {
    if (stoppedRef.current) return

    const nextIndex = currentIndexRef.current + 1

    if (nextIndex >= lines.length) {
      finishAll()
      return
    }

    currentIndexRef.current = nextIndex
    runLine(nextIndex)
  }

  function finishAll() {
    hardStop()
    setPhase('done')
    setCurrentIndex(lines.length - 1)
    setMessage('완료! 전체 쉐도잉을 끝냈어요.')
  }

  function stopShadowing() {
    hardStop()
    setPhase('idle')
    setMessage('중지했어요. 시작을 누르면 현재 문장부터 다시 진행합니다.')
  }

  function resetAll() {
    hardStop()
    Object.values(audioUrlsRef.current).forEach((url) => URL.revokeObjectURL(url))
    setAudioUrls({})
    currentIndexRef.current = 0
    setCurrentIndex(0)
    setPhase('idle')
    setMessage('처음부터 다시 시작할 수 있어요.')
  }

  function replayFromCurrent() {
    if (runningRef.current) return

    hardStop()
    stoppedRef.current = false
    runningRef.current = true
    runLine(currentIndexRef.current)
  }

  const isActive = phase !== 'idle' && phase !== 'done'
  const completedCount = phase === 'done' ? lines.length : currentIndex
  const progress = lines.length === 0 ? 0 : Math.round((completedCount / lines.length) * 100)

  if (lines.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">쉐도잉할 문장이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm md:p-5">
      <style>
        {`
          @keyframes shadowPulse {
            0% { box-shadow: 0 0 0 0 rgba(15, 23, 42, 0.28); }
            70% { box-shadow: 0 0 0 10px rgba(15, 23, 42, 0); }
            100% { box-shadow: 0 0 0 0 rgba(15, 23, 42, 0); }
          }

          @keyframes donePop {
            0% { transform: scale(0.96); opacity: 0; }
            60% { transform: scale(1.02); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }

          .shadow-current-pulse { animation: shadowPulse 1.3s infinite; }
          .shadow-done-pop { animation: donePop 0.45s ease-out; }
        `}
      </style>

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-slate-400">Auto Shadowing</p>
          <h3 className="mt-1 text-lg font-extrabold text-slate-900">전체 대화 쉐도잉</h3>
          <p className="mt-1 text-xs text-slate-500">
            듣기 → 0.3초 대기 → 5초 자동 녹음 → 0.3초 대기 → 다음 문장
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-500">
          {currentIndex + 1} / {lines.length}
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-slate-900 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {phase === 'done' && (
        <div className="shadow-done-pop mt-4 rounded-3xl bg-slate-900 p-5 text-center text-white">
          <p className="text-3xl">🎉</p>
          <p className="mt-2 text-lg font-extrabold">쉐도잉 완료!</p>
          <p className="mt-1 text-sm text-slate-300">전체 대화를 끝까지 따라 읽었어요.</p>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2">
        {!isActive ? (
          <button
            onClick={startShadowing}
            className="rounded-2xl bg-slate-900 px-3 py-3 text-sm font-extrabold text-white"
          >
            {phase === 'done' ? '다시 시작' : '시작'}
          </button>
        ) : (
          <button
            onClick={stopShadowing}
            className="rounded-2xl bg-red-500 px-3 py-3 text-sm font-extrabold text-white"
          >
            중지
          </button>
        )}

        <button
          onClick={replayFromCurrent}
          disabled={isActive}
          className="rounded-2xl bg-slate-100 px-3 py-3 text-sm font-extrabold text-slate-700 disabled:opacity-40"
        >
          현재 문장 다시
        </button>
      </div>

      <div className="mt-3 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
        {message}
      </div>

      <div className="mt-4 max-h-[56vh] overflow-y-auto rounded-3xl border border-slate-100 bg-white">
        <div className="divide-y divide-slate-100">
          {lines.map((line, index) => {
            const isCurrent = index === currentIndex
            const isCompleted = phase === 'done' || index < currentIndex
            const hasRecording = Boolean(audioUrls[line.id])

            return (
              <div
                key={line.id}
                ref={(node) => {
                  lineRefs.current[line.id] = node
                }}
                className={`grid grid-cols-[34px_1fr] gap-2 px-3 py-3 transition-all duration-300 md:grid-cols-[48px_1fr] md:gap-3 md:px-5 ${
                  isCurrent
                    ? 'shadow-current-pulse bg-slate-900 text-white'
                    : isCompleted
                      ? 'bg-slate-50 text-slate-400'
                      : 'bg-white text-slate-900'
                }`}
              >
                <div
                  className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold md:h-9 md:w-9 md:text-sm ${
                    isCurrent
                      ? 'bg-white text-slate-900'
                      : isCompleted
                        ? 'bg-slate-200 text-slate-500'
                        : line.speaker === 'A'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isCompleted && !isCurrent ? '✓' : line.speaker}
                </div>

                <div>
                  <p className="text-[15px] font-extrabold leading-6 md:text-lg md:leading-7">
                    {line.english_text}
                  </p>
                  <p className={`mt-1 text-xs font-semibold ${isCurrent ? 'text-slate-300' : 'text-slate-400'}`}>
                    {line.korean_text}
                  </p>

                  {hasRecording && (
                    <div className="mt-2">
                      <audio className="w-full" controls src={audioUrls[line.id]} />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={resetAll}
          className="rounded-2xl bg-slate-100 px-3 py-3 text-sm font-extrabold text-slate-600"
        >
          초기화
        </button>
        <button
          onClick={moveToNext}
          disabled={isActive || currentIndex >= lines.length - 1}
          className="rounded-2xl bg-slate-900 px-3 py-3 text-sm font-extrabold text-white disabled:opacity-40"
        >
          다음 문장으로
        </button>
      </div>
    </div>
  )
}
