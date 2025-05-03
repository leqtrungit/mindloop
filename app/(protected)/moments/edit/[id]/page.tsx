import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { createClient } from '@/utils/supabase/server'
import { Moment } from '@/utils/supabase/supabase'
import { MomentForm } from '@/components/moment-form'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface EditMomentPageProps {
  params: {
    id: string
  }
}

export default async function EditMomentPage({ params }: EditMomentPageProps) {
  const formT = await getTranslations('form')
  const { id } = params
  const supabase = await createClient()

  const { data: moment, error } = await supabase
    .from('moments')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !moment) {
    console.error('Error fetching moment:', error)
    notFound()
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="hidden md:flex">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/moments" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {formT('backToList')}
          </Link>
        </Button>
      </div>
      <MomentForm moment={moment as Moment} />
    </div>
  )
} 