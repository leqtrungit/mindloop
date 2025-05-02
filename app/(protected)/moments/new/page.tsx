'use client';

import { useTranslations } from 'next-intl';
import { MomentForm } from "@/components/moment-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FormPage() {
  const t = useTranslations('form');

  return (
    <div className="container max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="hidden md:flex">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/moments" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t('backToList')}
          </Link>
        </Button>
      </div>
      <MomentForm />
    </div>
  );
} 