import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { getStudyStats } from '../services/stats'

type HomeStats = {
  streak: number
  todayCompleted: boolean
  totalStudyCount?: number
  uniqueCompletedCount?: number
  recentRecords: Array<{
    id: string
    studied_date: string
    conversations: {
      id: string
      title: string
      situation: string
    } | null
  }>
}

export default function HomePage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<HomeStats>({
    streak: 0,
    todayCompleted: false,
    totalStudyCount: 0,
    uniqueCompletedCount: 0,
    recentRecords: [],
  })

  useEffect(() => {
    async function loadStats() {
      if (!user) return
      const result = await getStudyStats(user.id)
      setStats({
        streak: result.streak,
        todayCompleted: result.todayCompleted,
        totalStudyCount: result.totalStudyCount,
        uniqueCompletedCount: result.uniqueCompletedCount,
        recentRecords: result.recentRecords,
      })
    }

    loadStats()
  }, [user])

  const greeting = getGreeting()

  return (
    <section className="space-y-5">
      <div className="relative overflow-hidden rounded-[30px] border border-indigo-100 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/70" />

        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-[16px] font-black tracking-[-0.03em] text-indigo-500 sm:text-[18px]">
                {greeting}
              </p>

              <h2 className="mt-4 text-[34px] font-black leading-[1.08] tracking-[-0.07em] text-slate-950 sm:text-[42px]">
                오늘도 영어 10분,
                <br />
                가볍게
                <br className="sm:hidden" /> 시작해볼까요?
              </h2>
            </div>

            <div className="shrink-0 scale-[0.72] origin-top-right sm:scale-90">
              <HeroIllustration />
            </div>
          </div>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3.5 py-2 text-[13px] font-black text-indigo-600 sm:px-4 sm:py-2.5 sm:text-[15px]">
            <span>🔥</span>
            <span>{stats.streak > 0 ? `${stats.streak}일 연속 학습 중` : '오늘부터 연속 학습 시작'}</span>
          </div>

          <Link
            to={stats.todayCompleted ? '/catalog' : '/today'}
            className="mt-6 flex h-[72px] w-full items-center rounded-[22px] bg-gradient-to-r from-indigo-600 to-blue-500 px-6 text-[18px] font-black text-white shadow-[0_14px_30px_rgba(79,70,229,0.28)] sm:h-[82px] sm:text-[20px]"
          >
            <span>{stats.todayCompleted ? '추가 대화 학습하기' : '오늘의 학습 시작하기'}</span>
            <span className="ml-auto text-3xl font-light">→</span>
          </Link>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200/70 bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.055)] sm:p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[20px] font-black tracking-[-0.04em] text-slate-950 sm:text-[24px]">
            최근 학습
          </h3>
          <Link to="/records" className="text-[14px] font-black text-indigo-500 sm:text-[16px]">
            기록 보기 ›
          </Link>
        </div>

        <div className="mt-4 space-y-2.5">
          {stats.recentRecords.length === 0 && (
            <div className="rounded-[22px] bg-slate-50 p-4">
              <p className="text-base font-black text-slate-800">아직 학습 기록이 없습니다.</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">오늘의 학습을 시작해보세요.</p>
            </div>
          )}

          {stats.recentRecords.slice(0, 3).map((record, index) => (
            <Link
              key={record.id}
              to={record.conversations?.id ? `/conversation/${record.conversations.id}` : '/records'}
              className="flex items-center gap-3 rounded-[22px] bg-slate-50 p-3.5 transition hover:bg-slate-100"
            >
              <div
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-[16px] text-[22px] ${
                  index % 3 === 0
                    ? 'bg-blue-100 text-blue-600'
                    : index % 3 === 1
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-indigo-100 text-indigo-600'
                }`}
              >
                {index % 3 === 0 ? '💬' : index % 3 === 1 ? '☕' : '🎧'}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[17px] font-black tracking-[-0.03em] text-slate-950 sm:text-[18px]">
                  {record.conversations?.title}
                </p>
                <p className="mt-1 text-[13px] font-bold text-slate-400 sm:text-[14px]">
                  {record.studied_date}
                </p>
              </div>

              <span className="text-3xl font-light text-slate-400">›</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200/70 bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.055)] sm:p-5">
        <div className="grid grid-cols-3 divide-x divide-slate-200">
          <Stat icon="♨" label="연속 학습" value={String(stats.streak)} color="text-indigo-500" />
          <Stat icon="◎" label="오늘 완료" value={stats.todayCompleted ? '1' : '0'} color="text-blue-500" />
          <Stat icon="▮" label="총 기록" value={String(stats.totalStudyCount ?? 0)} color="text-emerald-500" />
        </div>
      </div>
    </section>
  )
}

function Stat({
  icon,
  label,
  value,
  color,
}: {
  icon: string
  label: string
  value: string
  color: string
}) {
  return (
    <div className="px-1 py-2 text-center">
      <p className={`text-[24px] font-black leading-none sm:text-[30px] ${color}`}>{icon}</p>
      <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-[26px]">
        {value}
      </p>
      <p className="mt-1.5 text-[11px] font-semibold text-slate-500 sm:text-[13px]">
        {label}
      </p>
    </div>
  )
}

function HeroIllustration() {
  return (
    <div className="relative h-36 w-40 sm:h-44 sm:w-52">
      <div className="absolute right-4 top-6 h-24 w-28 rounded-[22px] bg-white shadow-[0_20px_40px_rgba(79,70,229,0.18)] sm:h-28 sm:w-32" />
      <div className="absolute right-4 top-6 h-8 w-28 rounded-t-[22px] bg-gradient-to-r from-indigo-500 to-blue-500 sm:h-10 sm:w-32" />
      <div className="absolute right-8 top-2 h-9 w-4 rounded-full bg-indigo-500 shadow-sm sm:h-10" />
      <div className="absolute right-18 top-2 h-9 w-4 rounded-full bg-indigo-500 shadow-sm sm:h-10" />
      <div className="absolute right-28 top-2 h-9 w-4 rounded-full bg-indigo-500 shadow-sm sm:h-10" />
      <div className="absolute right-10 top-16 text-5xl font-black text-indigo-500 sm:text-6xl">✓</div>
      <div className="absolute bottom-0 right-0 grid h-16 w-16 place-items-center rounded-full border-[8px] border-blue-500 bg-white text-2xl font-black text-blue-500 shadow-[0_18px_35px_rgba(59,130,246,0.2)] sm:h-20 sm:w-20 sm:border-[10px] sm:text-3xl">
        ◔
      </div>
      <div className="absolute left-0 top-10 text-2xl text-indigo-300 sm:text-3xl">✦</div>
      <div className="absolute right-0 top-16 text-xl text-indigo-200 sm:text-2xl">✦</div>
    </div>
  )
}

function getGreeting() {
  const hour = new Date().getHours()

  if (hour < 12) return '좋은 아침이에요! 👋'
  if (hour < 18) return '좋은 오후예요! 👋'
  return '좋은 저녁이에요! 👋'
}
