import {
  createStartAPIHandler,
  defaultAPIFileRouteHandler,
} from "@tanstack/react-start/api";

import { paraglideMiddleware } from "@repo/dictionaries/server";

export default createStartAPIHandler((ctx) =>
  paraglideMiddleware(ctx.request, () => defaultAPIFileRouteHandler(ctx)),
);
