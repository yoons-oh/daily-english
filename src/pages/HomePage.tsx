import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { getStudyStats } from '../services/stats'

type HomeStats = {
  streak: number
  todayCompleted: boolean
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
    recentRecords: [],
  })

  useEffect(() => {
    async function loadStats() {
      if (!user) return
      const result = await getStudyStats(user.id)
      setStats({
        streak: result.streak,
        todayCompleted: result.todayCompleted,
        recentRecords: result.recentRecords,
      })
    }

    loadStats()
  }, [user])

  const greeting = getGreeting()

  return (
    <section className="space-y-5 pb-8">
      <div className="overflow-hidden rounded-[30px] bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
        <p className="text-sm font-bold text-indigo-500">{greeting}</p>
        <h2 className="mt-2 text-2xl font-extrabold leading-tight text-slate-900">
          오늘도 영어 10분,
          <br />
          가볍게 시작해볼까요?
        </h2>

        <div className="mt-4 inline-flex rounded-full bg-indigo-50 px-4 py-2 text-sm font-extrabold text-indigo-600">
          🔥 {stats.streak > 0 ? `${stats.streak}일 연속 학습 중` : '오늘부터 연속 학습 시작'}
        </div>

        {stats.todayCompleted ? (
          <div className="mt-5 rounded-3xl bg-slate-50 p-4">
            <p className="font-extrabold text-slate-900">오늘 학습을 완료했어요 🎉</p>
            <p className="mt-1 text-sm text-slate-500">
              추가로 공부하고 싶다면 대화목록에서 원하는 상황을 골라보세요.
            </p>
            <Link
              to="/catalog"
              className="mt-4 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white"
            >
              대화목록 보기
            </Link>
          </div>
        ) : (
          <Link
            to="/today"
            className="mt-5 inline-flex w-full justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-indigo-500/20"
          >
            오늘의 학습 시작하기
          </Link>
        )}
      </div>

      <div className="rounded-[30px] bg-white p-5 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold">최근 학습</h3>
          <Link to="/records" className="text-sm font-bold text-slate-400">
            기록 보기
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {stats.recentRecords.length === 0 && (
            <p className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-500">
              아직 학습 기록이 없습니다.
            </p>
          )}

          {stats.recentRecords.slice(0, 3).map((record) => (
            <Link
              key={record.id}
              to={record.conversations?.id ? `/conversation/${record.conversations.id}` : '/records'}
              className="block rounded-2xl bg-slate-50 p-4 transition hover:bg-slate-100"
            >
              <p className="font-extrabold text-slate-900">{record.conversations?.title}</p>
              <p className="mt-1 text-xs font-semibold text-slate-400">{record.studied_date}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function getGreeting() {
  const hour = new Date().getHours()

  if (hour < 12) return '좋은 아침이에요 👋'
  if (hour < 18) return '좋은 오후예요 👋'
  return '좋은 저녁이에요 👋'
}
