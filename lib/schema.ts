export type MomentType = 'learned' | 'applied' | 'reframed' | 'connected'
export type SourceType = 'book' | 'conversation' | 'article' | 'thinking' | 'other'
export type TimeOfDay = 'morning' | 'afternoon' | 'evening'

export interface Moment {
  id: string
  user_id: string
  title: string
  description: string
  type: MomentType
  tags: string[]
  impact_score: number | null
  source: SourceType
  time_of_day: TimeOfDay
  created_at: string
}

export const momentTypes: Record<MomentType, string> = {
  learned: 'Học được',
  applied: 'Đã áp dụng',
  reframed: 'Tái diễn giải',
  connected: 'Kết nối'
}

export const sources: Record<SourceType, string> = {
  book: 'Sách',
  conversation: 'Trò chuyện',
  article: 'Bài viết',
  thinking: 'Suy nghĩ',
  other: 'Khác'
}

export const timeOfDay: Record<TimeOfDay, string> = {
  morning: 'Sáng',
  afternoon: 'Chiều',
  evening: 'Tối'
} 