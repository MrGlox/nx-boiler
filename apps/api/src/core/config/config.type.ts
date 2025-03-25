import type { AppConfig } from './app-config.type';

// import type { MailerConfig } from '@repo/shared/mailer';

import type { GoogleConfig } from '../../auth/google/config/google-config.type';
import type { StripeConfig } from '../../payment/config/stripe-config.type';

export type AllConfigType = {
  app: AppConfig;
  google: GoogleConfig;
  // mailer: MailerConfig;
  stripe: StripeConfig;
};
