import type { AppConfig } from './app-config.type';

// import type { MailerConfig } from '@repo/shared/mailer';

import type { StripeConfig } from '../../payment/config/stripe-config.type';

export type AllConfigType = {
  app: AppConfig;
  // mailer: MailerConfig;
  stripe: StripeConfig;
};
