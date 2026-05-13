import { supabase } from './supabase'
import type { ConversationWithLines } from '../types/dialogue'

function getTodayString() {
  return new Date().toISOString().slice(0, 10)
}

function getTodaySeed() {
  const today = new Date()
  const start = new Date(today.getFullYear(), 0, 0)
  const diff = today.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

async function getConversationById(conversationId: string) {
  const { data, error } = await supabase
    .from('conversations')
    .select('*, dialogue_lines(*)')
    .eq('id', conversationId)
    .order('line_order', { referencedTable: 'dialogue_lines', ascending: true })
    .single()

  if (error) {
    throw error
  }

  return data as ConversationWithLines
}

export async function getTodayRecommendedConversation(userId: string) {
  const today = getTodayString()

  const { data: assigned, error: assignedError } = await supabase
    .from('daily_assignments')
    .select('conversation_id')
    .eq('user_id', userId)
    .eq('assigned_date', today)
    .maybeSingle()

  if (assignedError) {
    throw assignedError
  }

  if (assigned?.conversation_id) {
    return getConversationById(assigned.conversation_id)
  }

  const { data: allConversations, error: conversationsError } = await supabase
    .from('conversations')
    .select('*, dialogue_lines(*)')
    .eq('is_active', true)
    .order('order_no', { ascending: true })
    .order('line_order', { referencedTable: 'dialogue_lines', ascending: true })

  if (conversationsError) {
    throw conversationsError
  }

  const conversations = (allConversations ?? []) as ConversationWithLines[]

  if (conversations.length === 0) {
    return null
  }

  const { data: completedRecords } = await supabase
    .from('study_records')
    .select('conversation_id')
    .eq('user_id', userId)
    .eq('is_completed', true)

  const completedIds = new Set((completedRecords ?? []).map((record) => record.conversation_id))
  const notCompleted = conversations.filter((conversation) => !completedIds.has(conversation.id))

  const pool = notCompleted.length > 0 ? notCompleted : conversations
  const index = getTodaySeed() % pool.length
  const selected = pool[index]

  const { error: insertError } = await supabase
    .from('daily_assignments')
    .upsert({
      user_id: userId,
      conversation_id: selected.id,
      assigned_date: today,
    })

  if (insertError) {
    throw insertError
  }

  return selected
}
