import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  const t = await getTranslations('auth.signIn');

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md p-4">
        <form className="flex flex-col">
          <h1 className="text-2xl font-medium">{t('title')}</h1>
          <p className="text-sm text-foreground">
            {t('description')}{" "}
            <Link className="text-foreground font-medium underline" href="/sign-up">
              {t('signUpLink')}
            </Link>
          </p>
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">{t('email')}</Label>
            <Input name="email" placeholder={t('emailPlaceholder')} required />
            <div className="flex justify-between items-center">
              <Label htmlFor="password">{t('password')}</Label>
              <Link
                className="text-xs text-foreground underline"
                href="/forgot-password"
              >
                {t('forgotPassword')}
              </Link>
            </div>
            <PasswordInput
              name="password"
              placeholder={t('passwordPlaceholder')}
              required
            />
            <SubmitButton pendingText={t('submitting')} formAction={signInAction}>
              {t('submit')}
            </SubmitButton>
            <FormMessage message={searchParams} />
          </div>
        </form>
      </div>
    </div>
  );
}
