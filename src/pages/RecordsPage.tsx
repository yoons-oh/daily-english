import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../services/supabase'
import { useAuth } from '../hooks/useAuth'
import { getStudyStats } from '../services/stats'

type StudyRecord = {
  id: string
  studied_date: string
  study_count: number
  conversations: { id: string; title: string; situation?: string } | null
}

const icons = ['🏠', '☕', '✈️', '🏨', '🛍️', '🚕']

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

  const recent = useMemo(() => records.slice(0, 4), [records])

  if (loading) return <p className="text-sm font-semibold text-slate-500">학습 기록을 불러오는 중...</p>

  return (
    <section className="space-y-5 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-black tracking-[-0.05em] text-slate-950">학습 기록</h1>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600">Records</span>
      </div>

      <div className="overflow-hidden rounded-[28px] bg-gradient-to-br from-blue-600 to-indigo-600 p-5 text-white shadow-[0_18px_35px_rgba(37,99,235,0.25)]">
        <p className="text-[14px] font-black text-blue-100">전체 학습 현황</p>
        <div className="mt-6 grid grid-cols-3 divide-x divide-white/20 text-center">
          <Stat value={uniqueCompletedCount} label="학습한 대화" />
          <Stat value={totalStudyCount} label="학습한 문장" />
          <Stat value={streak} label="연속 학습일" />
        </div>
        <div className="mt-7 flex h-24 items-end gap-3 px-1">
          {[38, 48, 40, 55, 65, 60, 78].map((height, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full rounded-full bg-white/35" style={{ height: `${height}%` }} />
              <span className="text-[10px] font-bold text-blue-100">5/{10 + index}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-black text-slate-950">최근 학습</h2>
        <span className="text-sm font-black text-slate-400">전체 보기 ›</span>
      </div>

      <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
        {records.length === 0 && <p className="p-5 text-sm font-semibold text-slate-500">아직 학습 기록이 없습니다.</p>}
        {recent.map((record, index) => (
          <Link key={record.id} to={record.conversations?.id ? `/conversation/${record.conversations.id}` : '/records'} className="flex items-center gap-4 border-b border-slate-100 px-4 py-4 last:border-b-0">
            <div className={`grid h-12 w-12 place-items-center rounded-2xl text-xl ${index % 4 === 0 ? 'bg-blue-50' : index % 4 === 1 ? 'bg-emerald-50' : index % 4 === 2 ? 'bg-indigo-50' : 'bg-pink-50'}`}>{icons[index % icons.length]}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-black text-slate-950">{record.conversations?.title}</p>
              <p className="mt-1 text-xs font-semibold text-slate-400">{record.studied_date} · {record.study_count}회 학습</p>
            </div>
            <span className="text-sm font-black text-emerald-500">100%</span>
            <span className="text-xl text-slate-300">›</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="text-[25px] font-black leading-none">{value}</p>
      <p className="mt-2 text-[11px] font-bold text-blue-100">{label}</p>
    </div>
  )
}
