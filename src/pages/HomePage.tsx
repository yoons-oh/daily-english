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
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-[34px] border border-slate-200/70 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.06)] md:p-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/50" />
        <div className="absolute right-7 top-20 hidden md:block">
          <HeroIllustration />
        </div>

        <div className="relative max-w-[640px]">
          <p className="text-[22px] font-black tracking-[-0.03em] text-indigo-500">
            {greeting}
          </p>
          <h2 className="mt-5 text-[42px] font-black leading-[1.1] tracking-[-0.065em] text-slate-950 md:text-[56px]">
            오늘도 영어 10분,
            <br />
            가볍게 시작해볼까요?
          </h2>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2.5 text-[17px] font-black text-indigo-600">
            <span>🔥</span>
            <span>{stats.streak > 0 ? `${stats.streak}일 연속 학습 중` : '오늘부터 연속 학습 시작'}</span>
          </div>

          <Link
            to={stats.todayCompleted ? '/catalog' : '/today'}
            className="mt-8 flex w-full items-center justify-center rounded-[22px] bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-5 text-[20px] font-black text-white shadow-[0_14px_30px_rgba(79,70,229,0.28)] md:max-w-[760px]"
          >
            <span>{stats.todayCompleted ? '추가 대화 학습하기' : '오늘의 학습 시작하기'}</span>
            <span className="ml-auto text-3xl font-light">→</span>
          </Link>
        </div>
      </div>

      <div className="rounded-[30px] border border-slate-200/70 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.055)] md:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[24px] font-black tracking-[-0.04em] text-slate-950">최근 학습</h3>
          <Link to="/records" className="text-[17px] font-black text-indigo-500">
            기록 보기 ›
          </Link>
        </div>

        <div className="mt-5 space-y-3">
          {stats.recentRecords.length === 0 && (
            <div className="rounded-[24px] bg-slate-50 p-5">
              <p className="text-lg font-black text-slate-800">아직 학습 기록이 없습니다.</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">오늘의 학습을 시작해보세요.</p>
            </div>
          )}

          {stats.recentRecords.slice(0, 3).map((record, index) => (
            <Link
              key={record.id}
              to={record.conversations?.id ? `/conversation/${record.conversations.id}` : '/records'}
              className="flex items-center gap-4 rounded-[24px] bg-slate-50 p-4 transition hover:bg-slate-100"
            >
              <div
                className={`grid h-16 w-16 shrink-0 place-items-center rounded-[18px] text-[27px] ${
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
                <p className="truncate text-[20px] font-black tracking-[-0.035em] text-slate-950">
                  {record.conversations?.title}
                </p>
                <p className="mt-1 text-[16px] font-bold text-slate-400">{record.studied_date}</p>
              </div>
              <span className="text-4xl font-light text-slate-400">›</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-[30px] border border-slate-200/70 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.055)]">
        <div className="grid grid-cols-3 divide-x divide-slate-200">
          <Stat icon="♨" label="연속 학습일" value={String(stats.streak)} color="text-indigo-500" />
          <Stat icon="◎" label="오늘 학습 완료" value={stats.todayCompleted ? '1' : '0'} color="text-blue-500" />
          <Stat icon="▮" label="총 학습 기록" value={String(stats.totalStudyCount ?? 0)} color="text-emerald-500" />
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
    <div className="px-2 py-3 text-center">
      <p className={`text-[32px] font-black leading-none ${color}`}>{icon}</p>
      <p className="mt-3 text-[28px] font-black leading-none text-slate-950">{value}</p>
      <p className="mt-2 text-[14px] font-semibold text-slate-500">{label}</p>
    </div>
  )
}

function HeroIllustration() {
  return (
    <div className="relative h-52 w-64">
      <div className="absolute right-6 top-8 h-36 w-40 rounded-[26px] bg-white shadow-[0_20px_40px_rgba(79,70,229,0.18)]" />
      <div className="absolute right-6 top-8 h-12 w-40 rounded-t-[26px] bg-gradient-to-r from-indigo-500 to-blue-500" />
      <div className="absolute right-12 top-4 h-12 w-5 rounded-full bg-indigo-500 shadow-sm" />
      <div className="absolute right-24 top-4 h-12 w-5 rounded-full bg-indigo-500 shadow-sm" />
      <div className="absolute right-36 top-4 h-12 w-5 rounded-full bg-indigo-500 shadow-sm" />
      <div className="absolute right-16 top-24 text-7xl font-black text-indigo-500">✓</div>
      <div className="absolute bottom-0 right-0 grid h-24 w-24 place-items-center rounded-full border-[12px] border-blue-500 bg-white text-4xl font-black text-blue-500 shadow-[0_18px_35px_rgba(59,130,246,0.2)]">
        ◔
      </div>
      <div className="absolute left-0 top-14 text-4xl text-indigo-300">✦</div>
      <div className="absolute right-0 top-24 text-3xl text-indigo-200">✦</div>
    </div>
  )
}

function getGreeting() {
  const hour = new Date().getHours()

  if (hour < 12) return '좋은 아침이에요! 👋'
  if (hour < 18) return '좋은 오후예요! 👋'
  return '좋은 저녁이에요! 👋'
}
