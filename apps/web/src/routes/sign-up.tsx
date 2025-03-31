import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { Google } from '~/assets/logos';
import { Link } from '~/components/atoms/link';
import { Badge } from '~/components/ui/badge';
import { Button, buttonVariants } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { useForm } from '@tanstack/react-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { createFileRoute } from '@tanstack/react-router';
import { NotFound } from '~/components/NotFound';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const Route = createFileRoute('/sign-up')({
  component: SignupComponent,
  notFoundComponent: () => {
    return <NotFound>User not found</NotFound>;
  },
});

function SignupComponent() {
  const { t } = useTranslation('auth');

  const form = useForm({
    validators: {
      onBlur: schema,
    },
    onSubmit: async (formData) => {
      // const { data, error } = await authClient.signUp.email(formData);
    },
  });

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-[420px]">
      <header className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t('signup.title')}
        </h1>
        <p className="text-muted-foreground text-sm">
          {t('signup.description')}
        </p>
      </header>
      <main className={cn('grid gap-6')}>
        <a
          href="/auth/google"
          className={cn(
            'group relative inline-flex ',
            buttonVariants({ variant: 'outline' }),
          )}
        >
          <span className="inline-flex items-center">
            <Google className="mr-2 size-4" />
            Google
          </span>
          <Badge
            variant="info"
            className="group-hover:animate-bounce-rotated absolute -right-[12px] -top-[6px] rotate-12"
          >
            {t('recommended', { ns: 'common' })}
          </Badge>
        </a>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">
              {t('or_continue')}
            </span>
          </div>
        </div>

        <Form>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('fields.email')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t(
                      'fields.email_placeholder',
                      'name@example.com',
                    )}
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="********"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row-reverse justify-between items-center">
            <Button>{t('signup.action', 'Signup with email')}</Button>
          </div>
        </Form>
      </main>
      <footer>
        <p className="text-muted-foreground -mb-10 mt-10 px-8 text-center text-sm">
          {t('agree')}{' '}
          <Button asChild variant="link">
            <Link to="/terms" className="variant underline-offset-4">
              {t('terms')}
            </Link>
          </Button>{' '}
          {t('and')}{' '}
          <Button asChild variant="link">
            <Link to="/privacy" className="variant underline-offset-4">
              {t('privacy')}
            </Link>
          </Button>
          .
        </p>
      </footer>
    </div>
  );
}
