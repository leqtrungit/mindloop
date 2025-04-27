'use client';

import { useTranslations } from 'next-intl';
import { MomentForm } from "@/components/moment-form";

export default function FormPage() {
  const t = useTranslations('form');

  return (
    <div className="container max-w-2xl mx-auto pt-20">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('description')}
        </p>
        <MomentForm />
      </div>
    </div>
  );
} 