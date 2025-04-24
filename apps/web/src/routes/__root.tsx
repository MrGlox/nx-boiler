import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { z } from "zod";

import { getLocale } from "@repo/dictionaries/runtime";

// import Header from '@/components/Header';
import { customErrorMap } from "@/config/zod";
import { NotFound } from "@/components/NotFound";
import TanstackQueryLayout from "@/integrations/tanstack-query/layout";
import appCss from "@/styles.css?url";
import { seo } from "@/utils/seo";

import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import type { TRPCRouter } from "@/integrations/trpc/router";

interface RouterContext {
  queryClient: QueryClient;
  trpc: TRPCOptionsProxy<TRPCRouter>;
  // user: {};
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title:
          "NX Boilerplate | Type-Safe, Client-First, Full-Stack React Framework",
        description:
          "NX Boilerplate is a type-safe, client-first, full-stack React framework.",
      }),
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#ffffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
        <TanStackRouterDevtools />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: () => (
    <RootDocument>
      {/* <Header /> */}
      <Outlet />
      <TanStackRouterDevtools />
      <TanstackQueryLayout />
    </RootDocument>
  ),
});

function RootDocument({ children }: { children: React.ReactNode }) {
  z.setErrorMap(customErrorMap);

  return (
    <html lang={getLocale()}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
