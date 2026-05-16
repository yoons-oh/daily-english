import { useMemo, useState } from 'react'
import { useTTS } from '../hooks/useTTS'
import { useWakeLock } from '../hooks/useWakeLock'

type TTSControlsProps = {
  lines: string[]
  title?: string
  situation?: string
}

const situationIcons = [
  { keyword: ['카페', '커피', '음료'], icon: '☕', label: '카페' },
  { keyword: ['식당', '레스토랑', '주문', '음식'], icon: '🍽️', label: '식당' },
  { keyword: ['호텔', '체크인', '숙소'], icon: '🏨', label: '호텔' },
  { keyword: ['공항', '비행기', '여행'], icon: '✈️', label: '공항' },
  { keyword: ['쇼핑', '가게', '옷'], icon: '🛍️', label: '쇼핑' },
  { keyword: ['병원', '약국', '아파'], icon: '🏥', label: '병원' },
  { keyword: ['택시', '버스', '길', '교통'], icon: '🚕', label: '이동' },
]

export default function TTSControls({ lines, title = '듣기 연습', situation = '' }: TTSControlsProps) {
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

  const situationMeta = useMemo(() => {
    const text = `${title} ${situation}`.toLowerCase()
    return situationIcons.find((item) => item.keyword.some((keyword) => text.includes(keyword))) ?? {
      icon: '🎧',
      label: '듣기',
    }
  }, [title, situation])

  async function toggleKeepAwake(nextValue: boolean) {
    setKeepAwake(nextValue)

    if (nextValue) {
      const success = await requestWakeLock()
      if (!success) setNotice('이 브라우저는 화면 꺼짐 방지를 지원하지 않을 수 있어요.')
      else setNotice('듣기 중 화면이 꺼지지 않도록 유지합니다.')
    } else {
      await releaseWakeLock()
      setNotice('')
    }
  }

  async function playRepeated() {
    if (keepAwake && supported && !enabled) await requestWakeLock()
    await speakRepeated(lines, repeatCount)
    if (keepAwake) setNotice('듣기가 끝났습니다. 화면 꺼짐 방지는 계속 켜져 있어요.')
  }

  async function replayOnce() {
    if (keepAwake && supported && !enabled) await requestWakeLock()
    await speakRepeated(lines, 1)
  }

  function handleStop() {
    stop()
  }

  return (
    <div className="overflow-hidden rounded-[30px] border border-slate-100 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black text-blue-500">Listening Mode</p>
          <h3 className="mt-1 text-[24px] font-black tracking-[-0.05em] text-slate-950">듣기 연습</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            문장을 보지 않고 원어민 음성만 듣고 상황을 이해해보세요.
          </p>
        </div>

        {speaking && (
          <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600">재생 중</span>
        )}
      </div>

      <div className="mt-5 rounded-[26px] bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-5 text-center">
        <div className="mx-auto grid h-28 w-28 place-items-center rounded-[32px] bg-white text-[58px] shadow-[0_16px_35px_rgba(59,130,246,0.12)]">
          {situationMeta.icon}
        </div>
        <p className="mt-4 text-xs font-black text-blue-500">{situationMeta.label} 상황</p>
        <h4 className="mt-1 text-[20px] font-black tracking-[-0.04em] text-slate-950">{title}</h4>
        {situation && <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{situation}</p>}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {!speaking ? (
          <button
            onClick={playRepeated}
            className="flex h-[58px] items-center justify-center gap-2 rounded-[18px] bg-gradient-to-r from-indigo-600 to-blue-500 px-3 text-[16px] font-black text-white shadow-[0_14px_28px_rgba(79,70,229,0.25)] active:scale-[0.98]"
          >
            <span className="text-xl">🔊</span>
            듣기 시작
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="flex h-[58px] items-center justify-center gap-2 rounded-[18px] bg-gradient-to-r from-red-500 to-rose-500 px-3 text-[16px] font-black text-white shadow-[0_14px_28px_rgba(239,68,68,0.22)] active:scale-[0.98]"
          >
            <span className="text-lg">■</span>
            정지
          </button>
        )}

        <button
          onClick={replayOnce}
          disabled={speaking}
          className="flex h-[58px] items-center justify-center gap-2 rounded-[18px] bg-gradient-to-r from-indigo-600 to-blue-500 px-3 text-[16px] font-black text-white shadow-[0_14px_28px_rgba(79,70,229,0.25)] active:scale-[0.98] disabled:opacity-50"
        >
          <span className="text-xl">↻</span>
          다시 듣기
        </button>
      </div>

      <div className="mt-5 rounded-[24px] bg-slate-50 p-4">
        <div className="mb-2 flex items-center justify-between text-xs font-black text-slate-500">
          <span>듣기 속도</span>
          <span>{rate.toFixed(1)}x</span>
        </div>
        <input
          type="range"
          min="0.6"
          max="1.2"
          step="0.1"
          value={rate}
          onChange={(event) => setRate(Number(event.target.value))}
          className="w-full accent-blue-600"
        />
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[0.7, 0.9, 1.1].map((value) => (
            <button
              key={value}
              onClick={() => setRate(value)}
              className={`rounded-2xl px-3 py-2 text-xs font-black ${
                rate === value ? 'bg-blue-600 text-white' : 'bg-white text-slate-500'
              }`}
            >
              {value === 0.7 ? '천천히' : value === 0.9 ? '보통' : '빠르게'}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        <div>
          <div className="mb-2 flex items-center justify-between text-xs font-black text-slate-500">
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
            className="w-full accent-blue-600"
          />
        </div>

        <select
          value={selectedVoiceName}
          onChange={(event) => setSelectedVoiceName(event.target.value)}
          className="w-full rounded-[18px] bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none"
        >
          {voices.length === 0 && <option value="">기본 음성</option>}
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>{voice.name} / {voice.lang}</option>
          ))}
        </select>
      </div>

      <label className="mt-4 flex items-start gap-3 rounded-[22px] bg-indigo-50 p-4">
        <input
          type="checkbox"
          checked={keepAwake}
          onChange={(event) => toggleKeepAwake(event.target.checked)}
          className="mt-1 accent-blue-600"
        />
        <span>
          <span className="block text-sm font-black text-indigo-600">듣기 중 화면 꺼짐 방지</span>
          <span className="mt-1 block text-xs leading-5 text-slate-500">
            학습 중 화면이 자동으로 꺼지지 않게 유지합니다.
          </span>
        </span>
      </label>

      {notice && <div className="mt-3 rounded-2xl bg-slate-900 px-4 py-3 text-xs font-bold text-white">{notice}</div>}
    </div>
  )
}
