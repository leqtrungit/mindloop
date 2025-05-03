import { type ImpactLevel } from "@/utils/supabase/supabase"

// Types cụ thể cho các trường trong moments
export type MomentType = 'learned' | 'applied' | 'reframed' | 'connected'
export type SourceType = 'book' | 'conversation' | 'article' | 'thinking' | 'other'
export type TimeOfDay = 'morning' | 'afternoon' | 'evening'

// Re-export ImpactLevel từ supabase
export { ImpactLevel }

// Utility Functions
export function isValidMomentType(type: string): type is MomentType {
  return ['learned', 'applied', 'reframed', 'connected'].includes(type);
}

export function isValidSourceType(source: string): source is SourceType {
  return ['book', 'conversation', 'article', 'thinking', 'other'].includes(source);
}

export function isValidTimeOfDay(timeOfDay: string): timeOfDay is TimeOfDay {
  return ['morning', 'afternoon', 'evening'].includes(timeOfDay);
}

// Type Guard để kiểm tra nếu một giá trị là ImpactLevel
export function isValidImpactLevel(impact: string): impact is ImpactLevel {
  return ['LOW', 'MEDIUM', 'HIGH'].includes(impact);
} 