'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { type MomentType, type SourceType, type TimeOfDay } from '@/lib/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const formSchema = z.object({
  title: z.string().min(1, 'Vui lòng nhập tiêu đề'),
  type: z.enum(['learned', 'applied', 'reframed', 'connected']),
  tags: z.string().optional(),
  impact_score: z.number().min(1).max(5).optional(),
  source: z.enum(['book', 'conversation', 'article', 'thinking', 'other']),
  time_of_day: z.enum(['morning', 'afternoon', 'evening'])
})

type FormData = z.infer<typeof formSchema>

const timeOfDayOptions = ['morning', 'afternoon', 'evening'] as const

export function MomentForm() {
  const t = useTranslations('form')
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'learned',
      source: 'thinking',
      time_of_day: getTimeOfDay()
    }
  })

  function getTimeOfDay(): TimeOfDay {
    const hour = new Date().getHours()
    if (hour < 12) return 'morning'
    if (hour < 18) return 'afternoon'
    return 'evening'
  }

  const onSubmit = async (data: FormData) => {
    // TODO: Handle form submission
    console.log(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
      <div className="space-y-2">
        <Label htmlFor="title">{t('title')}</Label>
        <Input
          id="title"
          placeholder={t('titlePlaceholder')}
          {...form.register('title')}
        />
      </div>

      <div className="space-y-2">
        <Label>{t('type')}</Label>
        <RadioGroup
          defaultValue="learned"
          className="grid grid-cols-2 gap-2"
          onValueChange={(value: string) => form.setValue('type', value as MomentType)}
        >
          {Object.entries(t.raw('types') as Record<string, string>).map(([value, label]) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={value} />
              <Label htmlFor={value}>{label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">{t('tags')}</Label>
        <Input
          id="tags"
          placeholder={t('tagsPlaceholder')}
          {...form.register('tags')}
        />
      </div>

      <div className="space-y-2">
        <Label>{t('impact')}</Label>
        <Slider
          defaultValue={[3]}
          max={5}
          step={1}
          onValueChange={(value: number[]) => form.setValue('impact_score', value[0])}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="source">{t('source')}</Label>
        <Select
          defaultValue="thinking"
          onValueChange={(value: string) => form.setValue('source', value as SourceType)}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('sourcePlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(t.raw('sources') as Record<string, string>).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>{t('timeOfDayLabel')}</Label>
        <RadioGroup
          defaultValue={getTimeOfDay()}
          className="grid grid-cols-3 gap-2"
          onValueChange={(value: string) => form.setValue('time_of_day', value as TimeOfDay)}
        >
          {timeOfDayOptions.map((value) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={value} />
              <Label htmlFor={value}>{t(`timeOfDayOptions.${value}`)}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Button type="submit" className="w-full">
        {t('submit')}
      </Button>
    </form>
  )
} 