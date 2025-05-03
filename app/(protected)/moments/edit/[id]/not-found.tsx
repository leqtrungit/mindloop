import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'

export default async function NotFound() {
  const t = await getTranslations('moments')

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-bold">{t('notFound.title')}</h2>
      <p className="text-muted-foreground mt-2">
        {t('notFound.description')}
      </p>
      <Button asChild className="mt-8">
        <Link href="/moments">
          {t('notFound.backButton')}
        </Link>
      </Button>
    </div>
  )
} 