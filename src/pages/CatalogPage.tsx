import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../services/supabase'
import { useAuth } from '../hooks/useAuth'

type Category = {
  id: string
  name: string
  description: string | null
  order_no: number | null
}

type ConversationRow = {
  id: string
  category_id: string | null
  title: string
  situation: string
  turn_count: number
  order_no: number | null
  source?: string
  created_by?: string | null
  categories: {
    name: string
  } | null
}

type SourceFilter = 'all' | 'system' | 'mine'

export default function CatalogPage() {
  const { user } = useAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [conversations, setConversations] = useState<ConversationRow[]>([])
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all')
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      if (!user) return
      setLoading(true)

      const [{ data: categoryData }, { data: conversationData }, { data: recordsData }] =
        await Promise.all([
          supabase.from('categories').select('*').order('order_no', { ascending: true }),
          supabase
            .from('conversations')
            .select('id, category_id, title, situation, turn_count, order_no, source, created_by, categories(name)')
            .eq('is_active', true)
            .order('order_no', { ascending: true }),
          supabase
            .from('study_records')
            .select('conversation_id')
            .eq('user_id', user.id)
            .eq('is_completed', true),
        ])

      setCategories((categoryData ?? []) as Category[])
      setConversations((conversationData ?? []) as unknown as ConversationRow[])
      setCompletedIds(new Set((recordsData ?? []).map((item) => item.conversation_id)))
      setLoading(false)
    }

    loadData()
  }, [user])

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase()

    return conversations.filter((item) => {
      const matchCategory =
        selectedCategoryId === 'all' || item.category_id === selectedCategoryId

      const matchSource =
        sourceFilter === 'all' ||
        (sourceFilter === 'system' && item.source !== 'user') ||
        (sourceFilter === 'mine' && item.source === 'user' && item.created_by === user?.id)

      const matchKeyword =
        keyword.length === 0 ||
        item.title.toLowerCase().includes(keyword) ||
        item.situation.toLowerCase().includes(keyword) ||
        item.categories?.name.toLowerCase().includes(keyword)

      return matchCategory && matchSource && matchKeyword
    })
  }, [conversations, selectedCategoryId, sourceFilter, query, user])

  if (loading) {
    return <p className="text-sm text-slate-500">대화 목록을 불러오는 중...</p>
  }

  return (
    <section className="space-y-4 pb-8">
      <div className="rounded-3xl bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-400">Conversation Bank</p>
            <h2 className="mt-1 text-2xl font-extrabold">전체 대화 목록</h2>
            <p className="mt-2 text-sm text-slate-500">
              원하는 상황을 직접 골라서 학습할 수 있어요.
            </p>
          </div>
          <Link
            to="/conversation/new"
            className="shrink-0 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white"
          >
            + 추가
          </Link>
        </div>

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="상황 검색하기 예: 카페, 병원, 택시"
          className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-900"
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { key: 'all', label: '전체' },
          { key: 'system', label: '기본' },
          { key: 'mine', label: '내 대화' },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setSourceFilter(item.key as SourceFilter)}
            className={`rounded-2xl px-4 py-3 text-sm font-extrabold ${
              sourceFilter === item.key
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="-mx-4 overflow-x-auto px-4">
        <div className="flex gap-2 pb-1">
          <button
            onClick={() => setSelectedCategoryId('all')}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${
              selectedCategoryId === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600'
            }`}
          >
            전체
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${
                selectedCategoryId === category.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((item) => {
          const completed = completedIds.has(item.id)
          const isMine = item.source === 'user'

          return (
            <Link
              key={item.id}
              to={`/conversation/${item.id}`}
              className="rounded-3xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-400">
                    {item.categories?.name ?? '기타'} · {item.turn_count}턴 · {isMine ? '내 대화' : '기본'}
                  </p>
                  <h3 className="mt-1 line-clamp-1 text-lg font-extrabold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                    {item.situation}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                    completed
                      ? 'bg-slate-900 text-white'
                      : isMine
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {completed ? '완료' : isMine ? '내 대화' : '학습'}
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-3xl bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
          검색 결과가 없습니다.
        </div>
      )}
    </section>
  )
}
