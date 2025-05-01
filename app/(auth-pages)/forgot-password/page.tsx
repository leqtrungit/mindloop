import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  const t = await getTranslations('auth.forgotPassword');

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md p-4">
        <form className="flex flex-col">
          <div>
            <h1 className="text-2xl font-medium">{t('title')}</h1>
            <p className="text-sm text-secondary-foreground">
              {t('description')}{" "}
              <Link className="text-primary underline" href="/sign-in">
                {t('signInLink')}
              </Link>
            </p>
          </div>
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">{t('email')}</Label>
            <Input name="email" placeholder={t('emailPlaceholder')} required />
            <SubmitButton formAction={forgotPasswordAction} pendingText={t('submitting')}>
              {t('submit')}
            </SubmitButton>
            <FormMessage message={searchParams} />
          </div>
        </form>
      </div>
    </div>
  );
}
