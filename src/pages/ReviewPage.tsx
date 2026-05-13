import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../services/supabase'
import { useAuth } from '../hooks/useAuth'

type ReviewItem = {
  id: string
  created_at: string
  conversations: {
    id: string
    title: string
    situation: string
    turn_count?: number
  } | null
}

export default function ReviewPage() {
  const { user } = useAuth()
  const [items, setItems] = useState<ReviewItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadReviews() {
      if (!user) return
      setLoading(true)

      const { data } = await supabase
        .from('review_items')
        .select('id, created_at, conversations(id, title, situation, turn_count)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setItems((data ?? []) as unknown as ReviewItem[])
      setLoading(false)
    }

    loadReviews()
  }, [user])

  if (loading) return <p className="text-slate-500">복습 목록을 불러오는 중...</p>

  return (
    <section className="space-y-4 pb-8">
      <div className="rounded-[30px] bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
        <p className="text-sm font-bold text-indigo-500">Review</p>
        <h2 className="mt-1 text-2xl font-extrabold">복습하기</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          복습 목록에서 대화를 선택하면 바로 학습 화면으로 이동합니다.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {items.length === 0 && (
          <div className="rounded-[30px] bg-white p-6 text-center shadow-[0_10px_40px_rgba(15,23,42,0.06)] md:col-span-2">
            <p className="font-extrabold text-slate-900">아직 복습 목록이 없습니다.</p>
            <p className="mt-2 text-sm text-slate-500">학습 화면에서 복습 버튼을 눌러 추가해보세요.</p>
            <Link
              to="/catalog"
              className="mt-4 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white"
            >
              대화목록 보기
            </Link>
          </div>
        )}

        {items.map((item) => (
          <Link
            key={item.id}
            to={item.conversations?.id ? `/conversation/${item.conversations.id}` : '/review'}
            className="rounded-[28px] bg-white p-5 shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_16px_45px_rgba(15,23,42,0.1)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-slate-400">
                  {item.conversations?.turn_count ?? 8}턴 · 복습 추가일 {item.created_at.slice(0, 10)}
                </p>
                <h3 className="mt-1 text-lg font-extrabold text-slate-900">
                  {item.conversations?.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                  {item.conversations?.situation}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-extrabold text-indigo-600">
                학습
              </span>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-900 px-4 py-3 text-center text-sm font-extrabold text-white">
              다시 학습하기
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
