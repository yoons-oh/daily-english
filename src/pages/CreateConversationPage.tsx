import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'
import { useAuth } from '../hooks/useAuth'

type Category = {
  id: string
  name: string
}

type DraftLine = {
  speaker: 'A' | 'B'
  english_text: string
  korean_text: string
}

function createEmptyLines(): DraftLine[] {
  return Array.from({ length: 8 }, (_, index) => ({
    speaker: index % 2 === 0 ? 'A' : 'B',
    english_text: '',
    korean_text: '',
  }))
}

function parseDialogueText(englishBlock: string, koreanBlock: string): DraftLine[] {
  const englishLines = englishBlock
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const koreanLines = koreanBlock
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  return englishLines.map((rawLine, index) => {
    const match = rawLine.match(/^([ABab])\s*[:：]\s*(.+)$/)
    const speaker = (match?.[1]?.toUpperCase() as 'A' | 'B') || (index % 2 === 0 ? 'A' : 'B')
    const englishText = match?.[2]?.trim() || rawLine.replace(/^[ABab]\s*[:：]\s*/, '').trim()

    const koreanRaw = koreanLines[index] ?? ''
    const koreanText = koreanRaw.replace(/^[ABab]\s*[:：]\s*/, '').trim()

    return {
      speaker,
      english_text: englishText,
      korean_text: koreanText,
    }
  })
}

export default function CreateConversationPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryId, setCategoryId] = useState('')
  const [title, setTitle] = useState('')
  const [situation, setSituation] = useState('')
  const [lines, setLines] = useState<DraftLine[]>(createEmptyLines())
  const [englishPaste, setEnglishPaste] = useState('')
  const [koreanPaste, setKoreanPaste] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadCategories() {
      const { data } = await supabase
        .from('categories')
        .select('id, name')
        .order('order_no', { ascending: true })

      const list = (data ?? []) as Category[]
      setCategories(list)
      if (list[0]) setCategoryId(list[0].id)
    }

    loadCategories()
  }, [])

  function updateLine(index: number, key: keyof DraftLine, value: string) {
    setLines((prev) =>
      prev.map((line, lineIndex) =>
        lineIndex === index ? { ...line, [key]: value } : line
      )
    )
  }

  function addLine() {
    setLines((prev) => [
      ...prev,
      {
        speaker: prev.length % 2 === 0 ? 'A' : 'B',
        english_text: '',
        korean_text: '',
      },
    ])
  }

  function removeLine(index: number) {
    if (lines.length <= 8) {
      setMessage('대화는 최소 8줄 이상이어야 합니다.')
      return
    }

    setLines((prev) => prev.filter((_, lineIndex) => lineIndex !== index))
  }

  function applyPaste() {
    const parsed = parseDialogueText(englishPaste, koreanPaste)

    if (parsed.length < 8) {
      setMessage('붙여넣기 대화는 최소 8줄 이상이어야 합니다.')
      return
    }

    const hasEmptyKorean = parsed.some((line) => !line.korean_text.trim())

    if (hasEmptyKorean) {
      setMessage('영어와 한글 번역 줄 수가 맞는지 확인해주세요.')
      return
    }

    setLines(parsed)
    setMessage(`${parsed.length}줄 대화로 자동 분리했습니다. 아래 미리보기를 확인하세요.`)
  }

  function validate() {
    if (!title.trim()) return '제목을 입력해주세요.'
    if (!situation.trim()) return '상황 설명을 입력해주세요.'
    if (!categoryId) return '카테고리를 선택해주세요.'
    if (lines.length < 8) return '대화는 최소 8줄 이상이어야 합니다.'

    const hasEmpty = lines.some(
      (line) => !line.english_text.trim() || !line.korean_text.trim()
    )

    if (hasEmpty) return '모든 영어 문장과 한글 번역을 입력해주세요.'

    return ''
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user) return

    const validationMessage = validate()
    if (validationMessage) {
      setMessage(validationMessage)
      return
    }

    setSaving(true)
    setMessage('')

    const { data: conversation, error: conversationError } = await supabase
      .from('conversations')
      .insert({
        category_id: categoryId,
        title: title.trim(),
        situation: situation.trim(),
        difficulty: 'beginner',
        turn_count: lines.length,
        is_active: true,
        source: 'user',
        created_by: user.id,
        order_no: 9999,
      })
      .select('id')
      .single()

    if (conversationError || !conversation) {
      setSaving(false)
      setMessage(conversationError?.message ?? '대화를 저장하지 못했습니다.')
      return
    }

    const linePayload = lines.map((line, index) => ({
      conversation_id: conversation.id,
      speaker: line.speaker,
      line_order: index + 1,
      english_text: line.english_text.trim(),
      korean_text: line.korean_text.trim(),
    }))

    const { error: lineError } = await supabase
      .from('dialogue_lines')
      .insert(linePayload)

    setSaving(false)

    if (lineError) {
      setMessage(lineError.message)
      return
    }

    const goDetail = window.confirm('대화가 저장되었습니다. 바로 학습 화면으로 이동할까요?')
    if (goDetail) navigate(`/conversation/${conversation.id}`)
    else navigate('/catalog')
  }

  return (
    <section className="space-y-4 pb-10">
      <div className="rounded-3xl bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-slate-400">My Conversation</p>
        <h2 className="mt-1 text-2xl font-extrabold">대화 추가</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          전체 대화를 붙여넣으면 줄 단위로 자동 분리됩니다. A:/B: 형식이면 화자도 자동 인식합니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="text-sm font-bold text-slate-600">카테고리</span>
              <select
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-900"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </label>

            <label>
              <span className="text-sm font-bold text-slate-600">제목</span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="예: 카페에서 와이파이 비밀번호 묻기"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-900"
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="text-sm font-bold text-slate-600">상황 설명</span>
            <textarea
              value={situation}
              onChange={(event) => setSituation(event.target.value)}
              placeholder="예: 카페에서 직원에게 와이파이 비밀번호를 자연스럽게 묻는 상황"
              rows={3}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-900"
            />
          </label>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h3 className="text-lg font-extrabold">붙여넣기 자동 분리</h3>
          <p className="mt-1 text-xs text-slate-500">
            영어 대화와 한글 번역을 같은 줄 수로 붙여넣고 “자동 분리”를 누르세요.
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <label>
              <span className="text-sm font-bold text-slate-600">영어 대화</span>
              <textarea
                value={englishPaste}
                onChange={(event) => setEnglishPaste(event.target.value)}
                rows={8}
                placeholder={'A: Can I get a coffee?\nB: Sure. Hot or iced?'}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-slate-900"
              />
            </label>

            <label>
              <span className="text-sm font-bold text-slate-600">한글 번역</span>
              <textarea
                value={koreanPaste}
                onChange={(event) => setKoreanPaste(event.target.value)}
                rows={8}
                placeholder={'A: 커피 한 잔 주세요.\nB: 네. 따뜻한 걸로 드릴까요, 아이스로 드릴까요?'}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-slate-900"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={applyPaste}
            className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white"
          >
            자동 분리해서 미리보기
          </button>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-extrabold">대화 미리보기 / 수정</h3>
              <p className="mt-1 text-xs text-slate-500">필요하면 자동 분리된 문장을 직접 수정할 수 있습니다.</p>
            </div>
            <button
              type="button"
              onClick={addLine}
              className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white"
            >
              줄 추가
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {lines.map((line, index) => (
              <div key={index} className="rounded-3xl border border-slate-100 bg-slate-50 p-3">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <select
                      value={line.speaker}
                      onChange={(event) => updateLine(index, 'speaker', event.target.value as 'A' | 'B')}
                      className="rounded-xl bg-white px-3 py-2 text-sm font-extrabold outline-none"
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                    </select>
                    <span className="text-xs font-bold text-slate-400">{index + 1}번째 문장</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeLine(index)}
                    className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-400"
                  >
                    삭제
                  </button>
                </div>

                <div className="grid gap-2 md:grid-cols-2">
                  <textarea
                    value={line.english_text}
                    onChange={(event) => updateLine(index, 'english_text', event.target.value)}
                    placeholder="영어 문장"
                    rows={2}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-slate-900"
                  />
                  <textarea
                    value={line.korean_text}
                    onChange={(event) => updateLine(index, 'korean_text', event.target.value)}
                    placeholder="한글 번역"
                    rows={2}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-slate-900"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {message && (
          <div className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">{message}</div>
        )}

        <div className="sticky bottom-0 -mx-4 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:static md:mx-0 md:rounded-3xl md:border md:shadow-sm">
          <button
            disabled={saving}
            className="w-full rounded-2xl bg-slate-900 px-4 py-4 text-sm font-extrabold text-white disabled:opacity-50"
          >
            {saving ? '저장 중...' : '대화 저장'}
          </button>
        </div>
      </form>
    </section>
  )
}
