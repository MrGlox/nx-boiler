import * as SentryServer from "@sentry/node";
import * as Sentry from "@sentry/react";

import { createRouter as createTanstackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { createIsomorphicFn } from "@tanstack/react-start";

import * as TanstackQuery from "@/integrations/tanstack-query/root-provider";
import { getRouterBasepath } from "@/utils/router-basepath";

// Import the generated route tree
import { routeTree } from "@/routeTree.gen";
import "@/styles.css";

// Create a new router instance
export const createRouter = () => {
  const router = routerWithQueryClient(
    createTanstackRouter({
      routeTree,
      context: {
        ...TanstackQuery.getContext(),
      },
      scrollRestoration: true,
      defaultPreloadStaleTime: 0,
      basepath: getRouterBasepath(),
      Wrap: (props: { children: React.ReactNode }) => {
        return (
          <TanstackQuery.Provider>{props.children}</TanstackQuery.Provider>
        );
      },
    }),
    TanstackQuery.getContext().queryClient,
  );

  return router;
};

const router = createRouter();

createIsomorphicFn()
  .server(() => {
    SentryServer.init({
      dsn: import.meta.env["VITE_SENTRY_DSN"],
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
    });
  })
  .client(() => {
    Sentry.init({
      dsn: import.meta.env["VITE_SENTRY_DSN"],
      integrations: [
        Sentry.replayIntegration({
          maskAllText: false,
          blockAllMedia: false,
        }),
        Sentry.tanstackRouterBrowserTracingIntegration(router),
      ],
      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 1.0,
      replaysOnErrorSampleRate: 1.0,
    });
  })();

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
