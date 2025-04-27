'use client'

import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

export interface TagsInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  className?: string
}

export function TagsInput({ value, onChange, placeholder, className }: TagsInputProps) {
  const [inputValue, setInputValue] = React.useState('')
  const t = useTranslations()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const newTag = inputValue.trim()
      if (newTag && !value.includes(newTag)) {
        onChange([...value, newTag])
        setTimeout(() => setInputValue(''), 0)
      }
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className={cn('flex flex-wrap gap-2 rounded-md border p-2', className)}>
      {value.map(tag => (
        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="ml-1 rounded-full hover:bg-accent"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <Input
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || t('tagsPlaceholder')}
        className="flex-1 border-0 p-0 focus-visible:ring-0"
      />
    </div>
  )
} 