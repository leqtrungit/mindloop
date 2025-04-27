export type ImpactLevel = 'LOW' | 'MEDIUM' | 'HIGH'

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
  impact: ImpactLevel
  source: SourceType
  time_of_day: TimeOfDay
  created_at: string
}