import { supabase } from './supabase'

export async function addReviewOnce(userId: string, conversationId: string) {
  const { data: existing, error: existingError } = await supabase
    .from('review_items')
    .select('id')
    .eq('user_id', userId)
    .eq('conversation_id', conversationId)
    .maybeSingle()

  if (existingError) {
    return {
      status: 'error',
      message: existingError.message,
    }
  }

  if (existing) {
    return {
      status: 'already_exists',
      message: '이미 복습 목록에 추가된 대화입니다.',
    }
  }

  const { error } = await supabase.from('review_items').insert({
    user_id: userId,
    conversation_id: conversationId,
  })

  if (error) {
    if (
      error.code === '23505' ||
      error.message.toLowerCase().includes('duplicate') ||
      error.message.toLowerCase().includes('unique')
    ) {
      return {
        status: 'already_exists',
        message: '이미 복습 목록에 추가된 대화입니다.',
      }
    }

    return {
      status: 'error',
      message: error.message,
    }
  }

  return {
    status: 'created',
    message: '복습 목록에 추가했어요.',
  }
}
