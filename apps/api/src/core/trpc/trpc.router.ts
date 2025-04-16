import { INestApplication, Injectable } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';

import { TrpcService, createContext } from './trpc.service';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpcService: TrpcService,
    // private readonly userRouter: UserRouter,
    // private readonly postRouter: PostRouter,
    // private readonly roleRouter: RoleRouter,
    // private readonly categoryRouter: CategoryRouter,
  ) {}

  appRouter = this.trpcService.trpc.router({
    // ...this.userRouter.apply(),
    // ...this.postRouter.apply(),
    // ...this.roleRouter.apply(),
    // ...this.categoryRouter.apply(),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
        createContext,
      }),
    );
  }
}

export type AppRouter = TrpcRouter[`appRouter`];
