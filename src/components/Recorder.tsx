import { useRef, useState } from 'react'

export default function Recorder({ compact = false }: { compact?: boolean }) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function startRecording() {
    try {
      setError('')
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })
      const recorder = new MediaRecorder(stream)

      chunksRef.current = []
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data)
      }

      recorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(audioBlob)
        setAudioUrl(url)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorderRef.current = recorder
      recorder.start()
      setIsRecording(true)
    } catch {
      setError('마이크 권한을 허용해주세요.')
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)
  }

  function resetRecording() {
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    setAudioUrl(null)
    setIsRecording(false)
  }

  return (
    <div
      className={`overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)] ${
        compact ? 'p-5' : 'p-6'
      }`}
    >
      <h3 className="text-[26px] font-black tracking-[-0.05em] text-slate-950">내 목소리 녹음</h3>
      <p className="mt-3 text-[15px] leading-7 text-slate-500">
        각 문장을 듣고 따라 말해보세요.
        <br />내 목소리를 녹음하여 확인할 수 있습니다.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="flex h-[58px] items-center justify-center gap-2 rounded-[18px] bg-gradient-to-r from-indigo-600 to-blue-500 px-3 text-[16px] font-black text-white shadow-[0_14px_28px_rgba(79,70,229,0.25)] active:scale-[0.98]"
          >
            <span className="text-xl">🎙️</span>
            녹음 시작
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="flex h-[58px] items-center justify-center gap-2 rounded-[18px] bg-gradient-to-r from-red-500 to-rose-500 px-3 text-[16px] font-black text-white shadow-[0_14px_28px_rgba(239,68,68,0.22)] active:scale-[0.98]"
          >
            <span className="text-xl">■</span>
            녹음 정지
          </button>
        )}

        <button
          onClick={resetRecording}
          className="flex h-[58px] items-center justify-center gap-2 rounded-[18px] bg-gradient-to-r from-indigo-600 to-blue-500 px-3 text-[16px] font-black text-white shadow-[0_14px_28px_rgba(79,70,229,0.25)] active:scale-[0.98]"
        >
          <span className="text-xl">↻</span>
          다시 녹음
        </button>
      </div>

      <div className="mt-5 rounded-[22px] bg-indigo-50 px-4 py-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-[24px]">💡</span>
          <div>
            <p className="text-[15px] font-black text-indigo-600">녹음 팁</p>
            <p className="mt-1 text-[14px] leading-6 text-slate-600">
              원어민의 발음과 최대한 비슷하게 따라 말해보세요!
            </p>
          </div>
        </div>
      </div>

      {error && <div className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-500">{error}</div>}

      {audioUrl && (
        <div className="mt-5 rounded-[22px] border border-slate-100 bg-slate-50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[14px] font-black text-slate-700">내 녹음 재생</p>
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-black text-emerald-600">저장 완료</span>
          </div>
          <audio className="w-full" controls src={audioUrl}>
            브라우저가 오디오 재생을 지원하지 않습니다.
          </audio>
        </div>
      )}
    </div>
  )
}
