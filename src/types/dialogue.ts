export type DialogueLine = {
  id: string
  conversation_id: string
  speaker: 'A' | 'B'
  line_order: number
  english_text: string
  korean_text: string
}

export type Conversation = {
  id: string
  category_id: string | null
  title: string
  situation: string
  difficulty: 'beginner' | 'easy' | string
  turn_count: number
  is_active: boolean
}

export type ConversationWithLines = Conversation & {
  dialogue_lines: DialogueLine[]
}
