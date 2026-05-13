import { supabase } from './supabase'

export type CompleteStudyResult =
  | { status: 'created' }
  | { status: 'already_completed' }
  | { status: 'error'; message: string }

export async function completeStudyOnce(userId: string, conversationId: string): Promise<CompleteStudyResult> {
  const today = new Date().toISOString().slice(0, 10)

  const { data: existing, error: existingError } = await supabase
    .from('study_records')
    .select('id')
    .eq('user_id', userId)
    .eq('conversation_id', conversationId)
    .eq('studied_date', today)
    .maybeSingle()

  if (existingError) {
    return { status: 'error', message: existingError.message }
  }

  if (existing) {
    return { status: 'already_completed' }
  }

  const { error } = await supabase.from('study_records').insert({
    user_id: userId,
    conversation_id: conversationId,
    studied_date: today,
    is_completed: true,
    study_count: 1,
    last_studied_at: new Date().toISOString(),
  })

  if (error) {
    if (
      error.code === '23505' ||
      error.message.toLowerCase().includes('duplicate') ||
      error.message.toLowerCase().includes('unique')
    ) {
      return { status: 'already_completed' }
    }

    return { status: 'error', message: error.message }
  }

  return { status: 'created' }
}
