import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { getStudyStats } from '../services/stats'

type HomeStats = {
  streak: number
  todayCompleted: boolean
  totalStudyCount?: number
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
        recentRecords: result.recentRecords,
      })
    }

    loadStats()
  }, [user])

  const greeting = getGreeting()

  return (
    <section className="space-y-5">
      <div className="relative overflow-hidden rounded-[34px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)] md:p-8">
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-indigo-100 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-8 h-32 w-32 rounded-full bg-sky-100 blur-2xl" />

        <div className="relative">
          <p className="text-lg font-black text-indigo-500">{greeting}</p>
          <h2 className="mt-4 text-[34px] font-black leading-[1.12] tracking-[-0.05em] text-slate-950 md:text-5xl">
            오늘도 영어 10분,
            <br />
            가볍게 시작해볼까요?
          </h2>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2.5 text-sm font-black text-indigo-600">
            <span>🔥</span>
            <span>{stats.streak > 0 ? `${stats.streak}일 연속 학습 중` : '오늘부터 연속 학습 시작'}</span>
          </div>

          {stats.todayCompleted ? (
            <div className="mt-6 rounded-[28px] bg-slate-50 p-5">
              <p className="text-lg font-black text-slate-950">오늘 학습을 완료했어요 🎉</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                추가로 공부하고 싶다면 대화목록에서 원하는 상황을 골라보세요.
              </p>
              <Link
                to="/catalog"
                className="mt-5 flex w-full items-center justify-center rounded-[22px] bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-4 text-base font-black text-white shadow-xl shadow-indigo-500/20"
              >
                대화목록 보기 →
              </Link>
            </div>
          ) : (
            <Link
              to="/today"
              className="mt-7 flex w-full items-center justify-center rounded-[24px] bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-4 text-lg font-black text-white shadow-xl shadow-indigo-500/25"
            >
              오늘의 학습 시작하기 →
            </Link>
          )}
        </div>
      </div>

      <div className="rounded-[30px] border border-white/80 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black tracking-[-0.03em] text-slate-950">최근 학습</h3>
          <Link to="/records" className="text-sm font-black text-indigo-500">
            기록 보기 ›
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {stats.recentRecords.length === 0 && (
            <p className="rounded-[24px] bg-slate-50 p-5 text-sm font-bold text-slate-500">
              아직 학습 기록이 없습니다.
            </p>
          )}

          {stats.recentRecords.slice(0, 3).map((record, index) => (
            <Link
              key={record.id}
              to={record.conversations?.id ? `/conversation/${record.conversations.id}` : '/records'}
              className="flex items-center gap-4 rounded-[24px] bg-slate-50 p-4 transition active:scale-[0.99] hover:bg-slate-100"
            >
              <div
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-2xl ${
                  index % 3 === 0
                    ? 'bg-blue-100 text-blue-600'
                    : index % 3 === 1
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-indigo-100 text-indigo-600'
                }`}
              >
                {index % 3 === 0 ? '💬' : index % 3 === 1 ? '☕' : '🎯'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-black text-slate-950">
                  {record.conversations?.title}
                </p>
                <p className="mt-0.5 text-sm font-bold text-slate-400">{record.studied_date}</p>
              </div>
              <span className="text-2xl font-light text-slate-400">›</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Stat icon="🔥" label="연속 학습일" value={String(stats.streak)} />
        <Stat icon="🎯" label="오늘 학습" value={stats.todayCompleted ? '완료' : '대기'} />
        <Stat icon="▥" label="총 학습" value={String(stats.totalStudyCount ?? 0)} />
      </div>
    </section>
  )
}

function Stat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="rounded-[26px] border border-white/80 bg-white p-4 text-center shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
      <p className="text-2xl">{icon}</p>
      <p className="mt-1 text-xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-xs font-bold text-slate-400">{label}</p>
    </div>
  )
}

function getGreeting() {
  const hour = new Date().getHours()

  if (hour < 12) return '좋은 아침이에요! 👋'
  if (hour < 18) return '좋은 오후예요! 👋'
  return '좋은 저녁이에요! 👋'
}
