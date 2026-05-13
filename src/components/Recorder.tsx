import { useRef, useState } from 'react'

export default function Recorder() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const recorder = new MediaRecorder(stream)

    chunksRef.current = []

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data)
      }
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
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)
  }

  function resetRecording() {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
    setAudioUrl(null)
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold">내 목소리 녹음</h3>
      <p className="mt-2 text-sm text-slate-500">
        1차 버전에서는 녹음 파일을 서버에 저장하지 않고 브라우저에서만 재생합니다.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        {!isRecording ? (
          <button onClick={startRecording} className="button-primary">
            녹음 시작
          </button>
        ) : (
          <button onClick={stopRecording} className="button-danger">
            녹음 정지
          </button>
        )}

        <button onClick={resetRecording} className="button-secondary">
          다시 녹음
        </button>
      </div>

      {audioUrl && (
        <audio className="mt-5 w-full" controls src={audioUrl}>
          브라우저가 오디오 재생을 지원하지 않습니다.
        </audio>
      )}
    </div>
  )
}
