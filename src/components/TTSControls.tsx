import { useState } from 'react'
import { useTTS } from '../hooks/useTTS'
import { useWakeLock } from '../hooks/useWakeLock'

type TTSControlsProps = {
  lines: string[]
}

export default function TTSControls({ lines }: TTSControlsProps) {
  const {
    voices,
    rate,
    setRate,
    selectedVoiceName,
    setSelectedVoiceName,
    speaking,
    speakRepeated,
    stop,
  } = useTTS()

  const { supported, enabled, requestWakeLock, releaseWakeLock } = useWakeLock()
  const [repeatCount, setRepeatCount] = useState(1)
  const [keepAwake, setKeepAwake] = useState(false)
  const [notice, setNotice] = useState('')

  async function toggleKeepAwake(nextValue: boolean) {
    setKeepAwake(nextValue)

    if (nextValue) {
      const success = await requestWakeLock()
      if (!success) {
        setNotice('이 브라우저는 화면 꺼짐 방지를 지원하지 않을 수 있어요.')
      } else {
        setNotice('반복 듣기 중 화면이 꺼지지 않도록 유지합니다.')
      }
    } else {
      await releaseWakeLock()
      setNotice('')
    }
  }

  async function playRepeated() {
    if (keepAwake && supported && !enabled) {
      await requestWakeLock()
    }

    await speakRepeated(lines, repeatCount)

    if (keepAwake) {
      setNotice('반복 듣기가 끝났습니다. 화면 꺼짐 방지는 계속 켜져 있어요.')
    }
  }

  function handleStop() {
    stop()
  }

  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-extrabold">영어 듣기</h3>
          <p className="mt-1 text-xs text-slate-500">
            전체 대화를 최대 10번까지 반복해서 들을 수 있습니다.
          </p>
        </div>

        {speaking && (
          <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-bold text-white">
            재생 중
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {!speaking ? (
          <button
            onClick={playRepeated}
            className="rounded-2xl bg-slate-900 px-3 py-3 text-sm font-extrabold text-white"
          >
            전체 듣기
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="rounded-2xl bg-red-500 px-3 py-3 text-sm font-extrabold text-white"
          >
            정지
          </button>
        )}

        <select
          value={selectedVoiceName}
          onChange={(event) => setSelectedVoiceName(event.target.value)}
          className="rounded-2xl bg-slate-100 px-3 py-3 text-sm font-bold text-slate-700 outline-none"
        >
          {voices.length === 0 && <option value="">기본 음성</option>}
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} / {voice.lang}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-500">
            <span>읽기 속도</span>
            <span>{rate.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.6"
            max="1.2"
            step="0.1"
            value={rate}
            onChange={(event) => setRate(Number(event.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-500">
            <span>반복 듣기</span>
            <span>{repeatCount}회</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={repeatCount}
            onChange={(event) => setRepeatCount(Number(event.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <label className="mt-4 flex items-start gap-3 rounded-2xl bg-slate-50 p-3">
        <input
          type="checkbox"
          checked={keepAwake}
          onChange={(event) => toggleKeepAwake(event.target.checked)}
          className="mt-1"
        />
        <span>
          <span className="block text-sm font-extrabold text-slate-700">
            반복 듣기 중 화면 꺼짐 방지
          </span>
          <span className="mt-1 block text-xs leading-5 text-slate-500">
            휴대폰 화면을 직접 끄는 백그라운드 재생은 브라우저 정책상 제한될 수 있어요.
            대신 학습 중 화면이 자동으로 꺼지지 않게 유지합니다.
          </span>
        </span>
      </label>

      {notice && (
        <div className="mt-3 rounded-2xl bg-slate-900 px-4 py-3 text-xs font-bold text-white">
          {notice}
        </div>
      )}
    </div>
  )
}
