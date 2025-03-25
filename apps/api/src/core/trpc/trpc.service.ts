import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

@Injectable()
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class TrpcService {
  static t = initTRPC.create();

  static trpcRouter = TrpcService.t.router({
    getServer: TrpcService.t.procedure
      .input(z.string())
      .query(async ({ input }) => {
        return { id: input, name: 'myStash' };
      }),

    createCompany: TrpcService.t.procedure
      .input(z.object({ name: z.string().min(3) }))
      .mutation(async ({ input }) => {
        console.log('Here you go >>>', input);
      }),
  });
}

export type TrpcAppRouter = typeof TrpcService.trpcRouter;