import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../services/supabase'
import { useAuth } from '../hooks/useAuth'
import { getStudyStats } from '../services/stats'

type StudyRecord = {
  id: string
  studied_date: string
  study_count: number
  conversations: {
    id: string
    title: string
    situation?: string
  } | null
}

export default function RecordsPage() {
  const { user } = useAuth()
  const [records, setRecords] = useState<StudyRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [streak, setStreak] = useState(0)
  const [totalStudyCount, setTotalStudyCount] = useState(0)
  const [uniqueCompletedCount, setUniqueCompletedCount] = useState(0)

  useEffect(() => {
    async function loadRecords() {
      if (!user) return
      setLoading(true)

      const [{ data }, stats] = await Promise.all([
        supabase
          .from('study_records')
          .select('id, studied_date, study_count, conversations(id, title, situation)')
          .eq('user_id', user.id)
          .order('studied_date', { ascending: false }),
        getStudyStats(user.id),
      ])

      setRecords((data ?? []) as unknown as StudyRecord[])
      setStreak(stats.streak)
      setTotalStudyCount(stats.totalStudyCount)
      setUniqueCompletedCount(stats.uniqueCompletedCount)
      setLoading(false)
    }

    loadRecords()
  }, [user])

  if (loading) return <p className="text-slate-500">학습 기록을 불러오는 중...</p>

  return (
    <section className="space-y-4 pb-8">
      <div className="rounded-[30px] bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
        <p className="text-sm font-bold text-indigo-500">Records</p>
        <h2 className="mt-1 text-2xl font-extrabold">학습 기록</h2>
        <p className="mt-2 text-sm text-slate-500">
          학습 통계와 완료한 대화를 확인하세요.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard title="연속학습" value={`${streak}일`} />
        <StatCard title="총 학습" value={`${totalStudyCount}회`} />
        <StatCard title="완료 대화" value={`${uniqueCompletedCount}개`} />
      </div>

      <div className="rounded-[30px] bg-white p-5 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
        <h3 className="text-lg font-extrabold">완료한 학습</h3>

        <div className="mt-4 space-y-3">
          {records.length === 0 && (
            <p className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-500">
              아직 학습 기록이 없습니다.
            </p>
          )}

          {records.map((record) => (
            <Link
              key={record.id}
              to={record.conversations?.id ? `/conversation/${record.conversations.id}` : '/records'}
              className="block rounded-2xl bg-slate-50 p-4 transition hover:bg-slate-100"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-extrabold text-slate-900">{record.conversations?.title}</p>
                  <p className="mt-1 text-xs font-bold text-slate-400">
                    {record.studied_date} · {record.study_count}회 학습
                  </p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500">
                  보기
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[24px] bg-white p-4 text-center shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
      <p className="text-xs font-bold text-slate-400">{title}</p>
      <p className="mt-1 text-xl font-extrabold text-slate-900">{value}</p>
    </div>
  )
}
