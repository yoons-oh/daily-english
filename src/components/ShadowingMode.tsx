import { useEffect, useRef, useState } from 'react'
import type { DialogueLine } from '../types/dialogue'

type ShadowingModeProps = {
  lines: DialogueLine[]
}

type Phase = 'idle' | 'preparing' | 'listening' | 'waiting' | 'recording' | 'speaking' | 'moving' | 'done'

type RecordingState = Record<string, { url: string; mimeType: string; size: number }>

const WAIT_MS = 600

function getPracticeSeconds(text: string) {
  const words = text
    .replace(/[.,!?;:()"“”]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)

  if (words.length <= 2) return 2
  if (words.length <= 4) return 3
  if (words.length === 5) return 4
  return 5
}

function getSupportedMimeType() {
  if (typeof MediaRecorder === 'undefined') return ''
  const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4']
  return candidates.find((type) => MediaRecorder.isTypeSupported(type)) ?? ''
}

function getErrorMessage(error: unknown) {
  const name = error instanceof DOMException ? error.name : ''
  if (name === 'NotAllowedError' || name === 'PermissionDeniedError') return '마이크 권한이 차단되어 녹음할 수 없어요. 주소창 왼쪽 아이콘에서 마이크를 허용해주세요.'
  if (name === 'NotFoundError') return '연결된 마이크를 찾을 수 없어요. 마이크 연결 상태를 확인해주세요.'
  if (name === 'NotReadableError') return '다른 앱이 마이크를 사용 중일 수 있어요. Zoom/Teams/녹음 앱을 종료 후 다시 시도해주세요.'
  return '마이크를 시작하지 못했어요. 브라우저 마이크 권한을 확인해주세요.'
}

export default function ShadowingMode({ lines }: ShadowingModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('idle')
  const [recordings, setRecordings] = useState<RecordingState>({})
  const [message, setMessage] = useState('원문을 듣고 따라 말해보세요.')
  const [countdown, setCountdown] = useState(5)
  const [recordingError, setRecordingError] = useState('')
  const [micReady, setMicReady] = useState(false)
  const [recordEnabled, setRecordEnabled] = useState(true)

  const currentIndexRef = useRef(0)
  const recordEnabledRef = useRef(true)
  const runningRef = useRef(false)
  const stoppedRef = useRef(false)
  const timerRef = useRef<number | null>(null)
  const countdownTimerRef = useRef<number | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const recordingsRef = useRef<RecordingState>({})

  useEffect(() => {
    currentIndexRef.current = currentIndex
    const line = lines[currentIndex]
    if (line) setCountdown(getPracticeSeconds(line.english_text))
  }, [currentIndex, lines])

  useEffect(() => {
    recordEnabledRef.current = recordEnabled
  }, [recordEnabled])

  useEffect(() => {
    recordingsRef.current = recordings
  }, [recordings])

  useEffect(() => {
    return () => {
      hardStop()
      Object.values(recordingsRef.current).forEach((recording) => URL.revokeObjectURL(recording.url))
    }
  }, [])

  function clearTimer() {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  function clearCountdownTimer() {
    if (countdownTimerRef.current) {
      window.clearInterval(countdownTimerRef.current)
      countdownTimerRef.current = null
    }
  }

  function setSingleTimer(callback: () => void, delay: number) {
    clearTimer()
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null
      callback()
    }, delay)
  }

  function startCountdown(seconds: number) {
    clearCountdownTimer()
    setCountdown(seconds)
    countdownTimerRef.current = window.setInterval(() => {
      setCountdown((prev) => Math.max(prev - 1, 0))
    }, 1000)
  }

  function stopStream() {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    setMicReady(false)
  }

  function stopRecordingIfNeeded() {
    const recorder = mediaRecorderRef.current
    if (recorder && recorder.state === 'recording') recorder.stop()
  }

  function hardStop() {
    stoppedRef.current = true
    runningRef.current = false
    clearTimer()
    clearCountdownTimer()
    window.speechSynthesis.cancel()
    stopRecordingIfNeeded()
    stopStream()
  }

  async function ensureMicrophoneStream() {
    if (!navigator.mediaDevices?.getUserMedia) throw new Error('이 브라우저는 마이크 녹음을 지원하지 않아요. Chrome 또는 Edge에서 실행해주세요.')
    if (typeof MediaRecorder === 'undefined') throw new Error('MediaRecorder를 지원하지 않는 브라우저입니다. Chrome 또는 Edge에서 실행해주세요.')

    const currentStream = streamRef.current
    const hasLiveTrack = currentStream?.getAudioTracks().some((track) => track.readyState === 'live')
    if (currentStream && hasLiveTrack) return currentStream

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
    })
    streamRef.current = stream
    setMicReady(true)
    return stream
  }

  function speakOnce(text: string, rate = 0.9) {
    return new Promise<void>((resolve) => {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = rate
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

  function saveRecording(line: DialogueLine, mimeType: string) {
    const audioBlob = new Blob(chunksRef.current, { type: mimeType || 'audio/webm' })
    if (audioBlob.size <= 0) {
      setRecordingError('녹음 데이터가 비어 있어요. 다시 시작해보세요.')
      setMessage('녹음 파일이 저장되지 않았어요. 마이크 입력이 잡히지 않았을 수 있습니다.')
      return false
    }

    const url = URL.createObjectURL(audioBlob)
    setRecordings((prev) => {
      if (prev[line.id]) URL.revokeObjectURL(prev[line.id].url)
      return { ...prev, [line.id]: { url, mimeType: audioBlob.type, size: audioBlob.size } }
    })
    setRecordingError('')
    return true
  }

  function startSpeakingTimer(line: DialogueLine) {
    if (stoppedRef.current) return

    const seconds = getPracticeSeconds(line.english_text)
    setPhase('speaking')
    setMessage(`${seconds}초 동안 소리 내어 따라 말해보세요. 녹음은 하지 않습니다.`)
    startCountdown(seconds)

    setSingleTimer(() => {
      clearCountdownTimer()
      if (stoppedRef.current) return
      setPhase('moving')
      setMessage('연습 완료. 다음 문장으로 넘어갑니다.')
      setSingleTimer(() => moveToNext(), WAIT_MS)
    }, seconds * 1000)
  }

  async function startRecording(line: DialogueLine) {
    if (stoppedRef.current) return

    if (!recordEnabledRef.current) {
      startSpeakingTimer(line)
      return
    }

    try {
      const stream = await ensureMicrophoneStream()
      if (stoppedRef.current) return

      const seconds = getPracticeSeconds(line.english_text)
      chunksRef.current = []
      const mimeType = getSupportedMimeType()
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream)
      mediaRecorderRef.current = recorder

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) chunksRef.current.push(event.data)
      }
      recorder.onerror = () => setRecordingError('녹음 중 오류가 발생했어요. 다시 시작해주세요.')
      recorder.onstop = () => {
        clearCountdownTimer()
        mediaRecorderRef.current = null
        saveRecording(line, mimeType || recorder.mimeType)
        if (stoppedRef.current) return
        setPhase('moving')
        setMessage('녹음 저장 완료. 다음 문장으로 넘어갑니다.')
        setSingleTimer(() => moveToNext(), WAIT_MS)
      }

      setPhase('recording')
      setMessage(`녹음 중입니다. ${seconds}초 동안 따라 읽어주세요.`)
      recorder.start(200)
      startCountdown(seconds)

      setSingleTimer(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          mediaRecorderRef.current.requestData()
          window.setTimeout(() => {
            if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop()
          }, 120)
        }
      }, seconds * 1000)
    } catch (error) {
      hardStop()
      setPhase('idle')
      const errorMessage = error instanceof Error && !(error instanceof DOMException) ? error.message : getErrorMessage(error)
      setRecordingError(errorMessage)
      setMessage(errorMessage)
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
    setPhase('listening')
    setMessage('원문을 듣고 따라 말할 준비를 해주세요.')
    await speakOnce(line.english_text)
    if (stoppedRef.current) return
    setPhase('waiting')
    setMessage(recordEnabledRef.current ? '잠시 후 자동 녹음이 시작됩니다.' : '잠시 후 따라 말하기 시간이 시작됩니다.')
    setSingleTimer(() => startRecording(line), WAIT_MS)
  }

  async function startShadowing() {
    if (runningRef.current) return
    stoppedRef.current = false
    runningRef.current = true
    setRecordingError('')
    clearTimer()
    window.speechSynthesis.cancel()

    try {
      setPhase('preparing')
      if (recordEnabledRef.current) {
        setMessage('마이크 권한을 확인하는 중입니다.')
        await ensureMicrophoneStream()
        if (stoppedRef.current) return
      } else {
        setMessage('녹음 없이 쉐도잉을 시작합니다.')
      }
      runLine(currentIndexRef.current)
    } catch (error) {
      hardStop()
      setPhase('idle')
      const errorMessage = error instanceof Error && !(error instanceof DOMException) ? error.message : getErrorMessage(error)
      setRecordingError(errorMessage)
      setMessage(errorMessage)
    }
  }

  function goToIndex(index: number) {
    if (isActive) return
    const nextIndex = Math.min(Math.max(index, 0), lines.length - 1)
    currentIndexRef.current = nextIndex
    setCurrentIndex(nextIndex)
    setPhase('idle')
    setMessage('원문을 듣고 따라 말해보세요.')
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
    clearTimer()
    clearCountdownTimer()
    window.speechSynthesis.cancel()
    stopRecordingIfNeeded()
    stopStream()
    runningRef.current = false
    stoppedRef.current = true
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
    Object.values(recordingsRef.current).forEach((recording) => URL.revokeObjectURL(recording.url))
    setRecordings({})
    setRecordingError('')
    currentIndexRef.current = 0
    setCurrentIndex(0)
    setCountdown(lines[0] ? getPracticeSeconds(lines[0].english_text) : 5)
    setPhase('idle')
    setMessage('처음부터 다시 시작할 수 있어요.')
  }

  function replayFromCurrent() {
    if (runningRef.current) return
    stoppedRef.current = false
    runningRef.current = true
    setRecordingError('')
    runLine(currentIndexRef.current)
  }

  function playOriginal() {
    const line = lines[currentIndex]
    if (!line || (phase !== 'idle' && phase !== 'done')) return
    speakOnce(line.english_text)
  }

  function playSlowOriginal() {
    const line = lines[currentIndex]
    if (!line || (phase !== 'idle' && phase !== 'done')) return
    speakOnce(line.english_text, 0.68)
  }

  function toggleRecordEnabled() {
    if (phase !== 'idle' && phase !== 'done') return
    const nextValue = !recordEnabled
    setRecordEnabled(nextValue)
    recordEnabledRef.current = nextValue
    if (!nextValue) {
      stopStream()
      setMessage('녹음 없이 따라 말하기 시간만 제공합니다.')
    } else {
      setMessage('녹음 모드가 켜졌습니다. 시작하면 마이크 권한을 확인합니다.')
    }
  }

  const currentLine = lines[currentIndex]
  const isActive = phase !== 'idle' && phase !== 'done'
  const currentSeconds = currentLine ? getPracticeSeconds(currentLine.english_text) : 5
  const progress = lines.length === 0 ? 0 : Math.round(((currentIndex + (phase === 'done' ? 1 : 0)) / lines.length) * 100)
  const currentRecording = currentLine ? recordings[currentLine.id] : null

  if (lines.length === 0) {
    return <div className="rounded-3xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">쉐도잉할 문장이 없습니다.</p></div>
  }

  return (
    <div className="overflow-hidden rounded-[30px] border border-slate-100 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
      <style>{`
        @keyframes recordingPulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.08); opacity: .72; } 100% { transform: scale(1); opacity: 1; } }
        .shadow-recording-pulse { animation: recordingPulse 1s infinite; }
      `}</style>

      <div className="flex items-center justify-between">
        <button onClick={stopShadowing} className="grid h-9 w-9 place-items-center rounded-full bg-slate-50 text-xl font-black text-slate-700">×</button>
        <h3 className="text-[18px] font-black tracking-[-0.04em] text-slate-950">쉐도잉</h3>
        <span className="text-sm font-black text-slate-500">{currentIndex + 1} / {lines.length}</span>
      </div>

      <div className="mt-4 rounded-[20px] bg-slate-50 p-3">
        <button type="button" onClick={toggleRecordEnabled} disabled={isActive} className="flex w-full items-center justify-between gap-3 disabled:opacity-50">
          <div className="text-left">
            <p className="text-[13px] font-black text-slate-900">내 목소리 녹음</p>
            <p className="mt-1 text-[12px] font-semibold text-slate-500">
              {recordEnabled ? `문장 길이에 따라 ${currentSeconds}초 녹음합니다.` : `녹음 없이 ${currentSeconds}초 따라 말합니다.`}
            </p>
          </div>
          <span className={`flex h-7 w-12 items-center rounded-full p-1 transition ${recordEnabled ? 'bg-blue-600' : 'bg-slate-300'}`}>
            <span className={`h-5 w-5 rounded-full bg-white transition ${recordEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
          </span>
        </button>
      </div>

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-6 rounded-[26px] border border-slate-100 bg-white p-6 text-center shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
        <div className={`mx-auto grid h-12 w-12 place-items-center rounded-full text-[18px] font-black ${currentLine.speaker === 'A' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
          {currentLine.speaker}
        </div>

        <p className="mt-7 text-[23px] font-black leading-[1.35] tracking-[-0.04em] text-slate-950">{currentLine.english_text}</p>
        <p className="mt-5 text-[14px] font-semibold leading-6 text-slate-500">{currentLine.korean_text}</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button onClick={playOriginal} disabled={isActive} className="rounded-[16px] bg-blue-50 px-3 py-3 text-[13px] font-black text-blue-600 disabled:opacity-40">🔊 원문 듣기</button>
          <button onClick={playSlowOriginal} disabled={isActive} className="rounded-[16px] bg-slate-50 px-3 py-3 text-[13px] font-black text-blue-600 disabled:opacity-40">💡 천천히</button>
        </div>
      </div>

      <div className="mt-5 text-center">
        <p className="text-[14px] font-semibold leading-6 text-slate-500">{message}</p>
        {(phase === 'recording' || phase === 'speaking') && (
          <div className="mt-4 text-blue-500">
            <p className="shadow-recording-pulse text-5xl">〰️</p>
            <p className={`mt-2 text-sm font-black ${phase === 'recording' ? 'text-red-500' : 'text-blue-600'}`}>
              {phase === 'recording' ? `녹음 중 ${countdown}초` : `따라 말하기 ${countdown}초`}
            </p>
          </div>
        )}
      </div>

      {recordingError && <div className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{recordingError}</div>}

      {recordEnabled && currentRecording && (
        <div className="mt-4 rounded-[20px] bg-slate-50 p-3">
          <div className="mb-2 flex items-center justify-between text-xs font-black text-slate-500">
            <span>현재 문장 녹음</span>
            <span>{Math.max(1, Math.round(currentRecording.size / 1024))}KB</span>
          </div>
          <audio className="w-full" controls src={currentRecording.url} />
        </div>
      )}

      <div className="mt-5 grid gap-3">
        {!isActive ? (
          <button onClick={startShadowing} className="flex h-[58px] items-center justify-center gap-2 rounded-[18px] bg-gradient-to-r from-indigo-600 to-blue-500 text-[16px] font-black text-white shadow-[0_14px_28px_rgba(79,70,229,0.25)]">
            {recordEnabled ? `🎙️ ${currentSeconds}초 말하기 시작` : `🗣️ ${currentSeconds}초 따라하기 시작`}
          </button>
        ) : (
          <button onClick={stopShadowing} className="flex h-[58px] items-center justify-center rounded-[18px] bg-gradient-to-r from-red-500 to-rose-500 text-[16px] font-black text-white shadow-[0_14px_28px_rgba(239,68,68,0.22)]">중지</button>
        )}

        <button onClick={() => goToIndex(currentIndex + 1)} disabled={isActive || currentIndex >= lines.length - 1} className="h-[56px] rounded-[18px] bg-slate-50 text-[15px] font-black text-blue-600 disabled:opacity-40">다음 문장</button>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button onClick={() => goToIndex(currentIndex - 1)} disabled={isActive || currentIndex === 0} className="grid h-10 w-10 place-items-center rounded-full bg-slate-50 text-2xl text-slate-400 disabled:opacity-30">‹</button>
        <div className="flex gap-2">
          {lines.slice(0, Math.min(lines.length, 8)).map((line, index) => (
            <button key={line.id} onClick={() => goToIndex(index)} disabled={isActive} className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-blue-600' : index < currentIndex ? 'bg-blue-300' : 'bg-slate-200'}`} aria-label={`${index + 1}번 문장`} />
          ))}
        </div>
        <button onClick={() => goToIndex(currentIndex + 1)} disabled={isActive || currentIndex >= lines.length - 1} className="grid h-10 w-10 place-items-center rounded-full bg-slate-50 text-2xl text-slate-400 disabled:opacity-30">›</button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button onClick={replayFromCurrent} disabled={isActive} className="rounded-2xl bg-slate-100 px-3 py-3 text-sm font-black text-slate-600 disabled:opacity-40">현재 문장 다시</button>
        <button onClick={resetAll} className="rounded-2xl bg-slate-100 px-3 py-3 text-sm font-black text-slate-600">초기화</button>
      </div>
    </div>
  )
}
