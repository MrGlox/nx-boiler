import { createTRPCRouter } from './trpc';

import { greetingRouter } from '@/routes/greeting';

export const appRouter = createTRPCRouter({
  greeting: greetingRouter,
});

export type AppRouter = typeof appRouter;
