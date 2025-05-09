'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ImpactLevel, MomentType, SourceType, TimeOfDay } from '@/lib/types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { Slider } from '@/components/ui/slider'
import { createMoment, updateMoment } from '@/app/actions'
import { Textarea } from '@/components/ui/textarea'
import { TagsInput } from '@/components/tags-input'
import { type Moment } from '@/utils/supabase/supabase'

const formSchema = z.object({
  title: z.string().min(1, 'Vui lòng nhập tiêu đề'),
  description: z.string().optional(),
  type: z.enum(['learned', 'applied', 'reframed', 'connected']),
  tags: z.array(z.string()).optional(),
  impact: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  source: z.enum(['book', 'conversation', 'article', 'thinking', 'other']),
  time_of_day: z.enum(['morning', 'afternoon', 'evening'])
})

type FormData = z.infer<typeof formSchema>

const timeOfDayOptions = ['morning', 'afternoon', 'evening'] as const

interface MomentFormProps {
  moment?: Moment
}

export function MomentForm({ moment }: MomentFormProps) {
  const t = useTranslations('form')
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const isEditing = !!moment
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: moment?.title || '',
      description: moment?.description || undefined,
      type: (moment?.type as MomentType) || 'learned',
      tags: moment?.tags || undefined,
      impact: moment?.impact || 'MEDIUM',
      source: (moment?.source as SourceType) || 'thinking',
      time_of_day: (moment?.time_of_day as TimeOfDay) || getTimeOfDay()
    }
  })

  useEffect(() => {
    if (moment) {
      form.reset({
        title: moment.title,
        description: moment.description || undefined,
        type: moment.type as MomentType,
        tags: moment.tags || undefined,
        impact: moment.impact,
        source: moment.source as SourceType || 'thinking',
        time_of_day: moment.time_of_day as TimeOfDay || getTimeOfDay()
      })
    }
  }, [moment, form])

  function getTimeOfDay(): TimeOfDay {
    const hour = new Date().getHours()
    if (hour < 12) return 'morning'
    if (hour < 18) return 'afternoon'
    return 'evening'
  }

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true)
      if (isEditing && moment) {
        await updateMoment(moment.id, data)
        toast({
          title: t('updateSuccessTitle'),
          description: t('updateSuccessDescription'),
        })
        router.push('/moments')
      } else {
        await createMoment(data)
        toast({
          title: t('successTitle'),
          description: t('successDescription'),
        })
        router.push('/moments')
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t('errorTitle'),
        description: error instanceof Error ? error.message : t('errorDescription'),
      })
    } finally {
      setIsLoading(false)
    }
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
        <Label htmlFor="description">{t('notes')}</Label>
        <Textarea
          id="description"
          placeholder={t('descriptionPlaceholder')}
          className="min-h-[100px]"
          {...form.register('description')}
        />
      </div>

      <div className="space-y-2">
        <Label>{t('type')}</Label>
        <RadioGroup
          value={form.watch('type')}
          onValueChange={(value: string) => form.setValue('type', value as MomentType)}
          className="grid grid-cols-2 gap-2"
        >
          {Object.entries(t.raw('types') as Record<string, string>).map(([value, label]) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={value} />
              <Label htmlFor={value}>{label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>{t('impact')}</Label>
        <div className="relative">
          <Slider
            value={[getImpactValue(form.watch('impact'))]}
            min={0}
            max={2}
            step={1}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            onValueChange={(value: number[]) => {
              const impactMap: Record<number, ImpactLevel> = {
                0: 'LOW',
                1: 'MEDIUM',
                2: 'HIGH'
              }
              form.setValue('impact', impactMap[value[0]])
            }}
          />
          <div className="absolute -bottom-6 left-0 right-0 flex justify-between px-2 text-xs text-muted-foreground">
            <span>{t('impactLevels.low')}</span>
            <span>{t('impactLevels.medium')}</span>
            <span>{t('impactLevels.high')}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="source">{t('source')}</Label>
        <Select
          value={form.watch('source')}
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
          value={form.watch('time_of_day')}
          onValueChange={(value: string) => form.setValue('time_of_day', value as TimeOfDay)}
          className="grid grid-cols-3 gap-2"
        >
          {timeOfDayOptions.map((value) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={value} />
              <Label htmlFor={value}>{t(`timeOfDayOptions.${value}`)}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">{t('tags')}</Label>
        <TagsInput
          value={form.watch('tags') || []}
          onChange={(tags) => form.setValue('tags', tags)}
          placeholder={t('tagsPlaceholder')}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? t('submitting') : isEditing ? t('update') : t('submit')}
      </Button>
    </form>
  )
}

function getImpactValue(impact: ImpactLevel): number {
  const impactMap: Record<ImpactLevel, number> = {
    'LOW': 0,
    'MEDIUM': 1,
    'HIGH': 2
  }
  return impactMap[impact]
}