import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getTranslations } from 'next-intl/server';

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  const t = await getTranslations('auth.resetPassword');

  return (
    <div className="w-full p-4">
      <form className="flex flex-col">
        <div>
          <h1 className="text-2xl font-medium">{t('title')}</h1>
          <p className="text-sm text-secondary-foreground">
            {t('description')}
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="password">{t('newPassword')}</Label>
          <Input
            type="password"
            name="password"
            placeholder={t('newPasswordPlaceholder')}
            required
          />
          <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder={t('confirmPasswordPlaceholder')}
            required
          />
          <SubmitButton formAction={resetPasswordAction} pendingText={t('submitting')}>
            {t('submit')}
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
