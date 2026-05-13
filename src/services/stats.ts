import { supabase } from './supabase'

export type StudyStats = {
  streak: number
  totalStudyCount: number
  uniqueCompletedCount: number
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

function toDateString(date: Date) {
  return date.toISOString().slice(0, 10)
}

function calculateStreak(dates: string[]) {
  const uniqueDates = Array.from(new Set(dates)).sort((a, b) => b.localeCompare(a))
  if (uniqueDates.length === 0) return 0

  const today = new Date()
  const todayString = toDateString(today)
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  const yesterdayString = toDateString(yesterday)

  let startDateString = ''

  if (uniqueDates.includes(todayString)) {
    startDateString = todayString
  } else if (uniqueDates.includes(yesterdayString)) {
    startDateString = yesterdayString
  } else {
    return 0
  }

  let streak = 0
  const dateSet = new Set(uniqueDates)
  const cursor = new Date(`${startDateString}T00:00:00`)

  while (dateSet.has(toDateString(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }

  return streak
}

export async function getStudyStats(userId: string): Promise<StudyStats> {
  const { data: records } = await supabase
    .from('study_records')
    .select('id, studied_date, conversation_id, conversations(id, title, situation)')
    .eq('user_id', userId)
    .eq('is_completed', true)
    .order('studied_date', { ascending: false })
    .order('last_studied_at', { ascending: false })

  const list = (records ?? []) as StudyStats['recentRecords'] & Array<{ conversation_id?: string }>
  const dates = list.map((record) => record.studied_date)
  const today = toDateString(new Date())
  const uniqueConversationIds = new Set(list.map((record) => record.conversation_id).filter(Boolean))

  return {
    streak: calculateStreak(dates),
    totalStudyCount: list.length,
    uniqueCompletedCount: uniqueConversationIds.size,
    todayCompleted: dates.includes(today),
    recentRecords: list.slice(0, 5),
  }
}
