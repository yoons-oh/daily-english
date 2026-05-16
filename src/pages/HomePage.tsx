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
    <section className="space-y-4">
      <div className="relative overflow-hidden rounded-[24px] border border-indigo-100 bg-white px-7 pb-7 pt-7 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:rounded-[28px] sm:px-8 sm:pb-8 sm:pt-8">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/75 via-white to-blue-50/70" />
        <div className="pointer-events-none absolute right-[34px] top-[198px] sm:right-[42px] sm:top-[188px]">
          <HeroIllustration />
        </div>

        <div className="relative">
          <p className="text-[15px] font-black tracking-[-0.03em] text-indigo-500 sm:text-[16px]">
            {greeting}
          </p>

          <h2 className="mt-5 max-w-[280px] text-[30px] font-black leading-[1.12] tracking-[-0.055em] text-slate-950 sm:max-w-[330px] sm:text-[36px]">
            오늘도 영어 10분,
            <br />
            가볍게
            <br />
            시작해볼까요?
          </h2>

          <div className="mt-[116px] inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-2 text-[12px] font-black text-indigo-600 sm:mt-[118px] sm:text-[13px]">
            <span>🔥</span>
            <span>{stats.streak > 0 ? `${stats.streak}일 연속 학습 중` : '오늘부터 연속 학습 시작'}</span>
          </div>

          <Link
            to={stats.todayCompleted ? '/catalog' : '/today'}
            className="mt-5 flex h-[58px] w-full items-center rounded-[16px] bg-gradient-to-r from-indigo-600 to-blue-500 px-5 text-[15px] font-black text-white shadow-[0_14px_28px_rgba(79,70,229,0.26)] sm:h-[64px] sm:rounded-[18px] sm:px-6 sm:text-[17px]"
          >
            <span>{stats.todayCompleted ? '추가 대화 학습하기' : '오늘의 학습 시작하기'}</span>
            <span className="ml-auto text-2xl font-light">→</span>
          </Link>
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200/70 bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.055)] sm:p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-black tracking-[-0.04em] text-slate-950 sm:text-[20px]">
            최근 학습
          </h3>
          <Link to="/records" className="text-[13px] font-black text-indigo-500 sm:text-[14px]">
            기록 보기 ›
          </Link>
        </div>

        <div className="mt-4 space-y-2.5">
          {stats.recentRecords.length === 0 && (
            <div className="rounded-[20px] bg-slate-50 p-4">
              <p className="text-[15px] font-black text-slate-800">아직 학습 기록이 없습니다.</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">오늘의 학습을 시작해보세요.</p>
            </div>
          )}

          {stats.recentRecords.slice(0, 3).map((record, index) => (
            <Link
              key={record.id}
              to={record.conversations?.id ? `/conversation/${record.conversations.id}` : '/records'}
              className="flex items-center gap-3 rounded-[20px] bg-slate-50 p-3 transition hover:bg-slate-100"
            >
              <div
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-[14px] text-[20px] ${
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
                <p className="truncate text-[15px] font-black tracking-[-0.03em] text-slate-950 sm:text-[16px]">
                  {record.conversations?.title}
                </p>
                <p className="mt-1 text-[12px] font-bold text-slate-400">
                  {record.studied_date}
                </p>
              </div>

              <span className="text-2xl font-light text-slate-400">›</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200/70 bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.055)] sm:p-5">
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
      <p className={`text-[22px] font-black leading-none sm:text-[26px] ${color}`}>{icon}</p>
      <p className="mt-2 text-[20px] font-black leading-none text-slate-950 sm:text-[24px]">
        {value}
      </p>
      <p className="mt-1.5 text-[10px] font-semibold text-slate-500 sm:text-[12px]">
        {label}
      </p>
    </div>
  )
}

function HeroIllustration() {
  return (
    <div className="relative h-[118px] w-[138px] sm:h-[128px] sm:w-[150px]">
      <div className="absolute right-4 top-4 h-[78px] w-[88px] rounded-[17px] bg-white shadow-[0_18px_34px_rgba(79,70,229,0.16)] sm:h-[86px] sm:w-[96px]" />
      <div className="absolute right-4 top-4 h-[30px] w-[88px] rounded-t-[17px] bg-gradient-to-r from-indigo-500 to-blue-500 sm:w-[96px]" />
      <div className="absolute right-[30px] top-0 h-9 w-3.5 rounded-full bg-indigo-500 shadow-sm" />
      <div className="absolute right-[62px] top-0 h-9 w-3.5 rounded-full bg-indigo-500 shadow-sm" />
      <div className="absolute right-[94px] top-0 h-9 w-3.5 rounded-full bg-indigo-500 shadow-sm" />
      <div className="absolute right-[32px] top-[48px] text-[48px] font-black leading-none text-indigo-500 sm:text-[54px]">✓</div>
      <div className="absolute bottom-0 right-0 grid h-[58px] w-[58px] place-items-center rounded-full border-[7px] border-blue-500 bg-white text-[22px] font-black text-blue-500 shadow-[0_15px_28px_rgba(59,130,246,0.2)] sm:h-[64px] sm:w-[64px]">
        ◔
      </div>
      <div className="absolute left-0 top-[58px] text-[22px] text-indigo-300">✦</div>
      <div className="absolute right-0 top-[56px] text-[18px] text-indigo-200">✦</div>
    </div>
  )
}

function getGreeting() {
  const hour = new Date().getHours()

  if (hour < 12) return '좋은 아침이에요! 👋'
  if (hour < 18) return '좋은 오후예요! 👋'
  return '좋은 저녁이에요! 👋'
}
