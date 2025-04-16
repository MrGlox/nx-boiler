import {
  createStartAPIHandler,
  defaultAPIFileRouteHandler,
} from "@tanstack/react-start/api";

import { paraglideMiddleware } from "./paraglide/server.js";

export default createStartAPIHandler((ctx) =>
  paraglideMiddleware(ctx.request, () => defaultAPIFileRouteHandler(ctx)),
);
