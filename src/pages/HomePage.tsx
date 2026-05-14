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

  return (
    <section className="space-y-5">
      <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-indigo-600 via-blue-500 to-sky-400 p-6 text-white shadow-[0_24px_70px_rgba(79,70,229,0.32)] md:p-8">
        <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute bottom-0 left-6 h-32 w-32 rounded-full bg-cyan-200/30 blur-2xl" />

        <div className="relative">
          <div className="inline-flex rounded-full bg-white/18 px-3 py-1.5 text-xs font-black text-white backdrop-blur">
            STEP22 UI 적용 확인
          </div>

          <h2 className="mt-5 text-[36px] font-black leading-[1.08] tracking-[-0.06em] md:text-6xl">
            오늘도 영어 10분,
            <br />
            바로 시작해요
          </h2>

          <p className="mt-4 max-w-xl text-sm font-semibold leading-6 text-white/82 md:text-base">
            듣기, 녹음, 쉐도잉까지 한 번에 연습하는 실생활 영어 대화 앱입니다.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-black text-indigo-600">
            🔥 {stats.streak > 0 ? `${stats.streak}일 연속 학습 중` : '오늘부터 연속 학습 시작'}
          </div>

          <Link
            to={stats.todayCompleted ? '/catalog' : '/today'}
            className="mt-7 flex w-full items-center justify-center rounded-[24px] bg-white px-5 py-4 text-lg font-black text-indigo-600 shadow-xl shadow-indigo-900/20"
          >
            {stats.todayCompleted ? '추가 대화 학습하기 →' : '오늘의 학습 시작하기 →'}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Stat icon="🔥" label="연속" value={`${stats.streak}일`} />
        <Stat icon="🎯" label="오늘" value={stats.todayCompleted ? '완료' : '대기'} />
        <Stat icon="📚" label="총 학습" value={`${stats.totalStudyCount ?? 0}`} />
      </div>

      <div className="rounded-[32px] border border-white/80 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.07)]">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black tracking-[-0.04em] text-slate-950">최근 학습</h3>
          <Link to="/records" className="text-sm font-black text-indigo-500">
            전체보기
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {stats.recentRecords.length === 0 && (
            <div className="rounded-[26px] bg-slate-50 p-5">
              <p className="font-black text-slate-800">아직 학습 기록이 없어요.</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">오늘의 학습을 먼저 시작해보세요.</p>
            </div>
          )}

          {stats.recentRecords.slice(0, 3).map((record, index) => (
            <Link
              key={record.id}
              to={record.conversations?.id ? `/conversation/${record.conversations.id}` : '/records'}
              className="flex items-center gap-4 rounded-[26px] bg-slate-50 p-4 transition hover:bg-indigo-50"
            >
              <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-[20px] text-2xl ${
                index === 0 ? 'bg-indigo-100' : index === 1 ? 'bg-cyan-100' : 'bg-emerald-100'
              }`}>
                {index === 0 ? '💬' : index === 1 ? '🎧' : '🗣️'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-black text-slate-950">{record.conversations?.title}</p>
                <p className="text-xs font-bold text-slate-400">{record.studied_date}</p>
              </div>
              <span className="text-2xl text-slate-300">›</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="rounded-[28px] border border-white/80 bg-white p-4 text-center shadow-[0_14px_45px_rgba(15,23,42,0.06)]">
      <p className="text-2xl">{icon}</p>
      <p className="mt-1 text-lg font-black text-slate-950">{value}</p>
      <p className="mt-0.5 text-xs font-black text-slate-400">{label}</p>
    </div>
  )
}
