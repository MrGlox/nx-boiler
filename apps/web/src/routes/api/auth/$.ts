import { createAPIFileRoute } from "@tanstack/react-start/api";

import { auth } from "@/server/auth";

export const APIRoute = createAPIFileRoute("/api/auth/$")({
  GET: ({ request }: { request: Request }) => {
    return auth.handler(request);
  },
  POST: ({ request }: { request: Request }) => {
    return auth.handler(request);
  },
});
