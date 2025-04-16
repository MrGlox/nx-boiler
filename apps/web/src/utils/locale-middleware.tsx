import { AsyncLocalStorage } from "node:async_hooks";

import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

import {
  type Locale,
  baseLocale,
  getLocale,
  overwriteGetLocale,
} from "@/paraglide/runtime";
import { paraglideMiddleware } from "@/paraglide/server";

export const localeMiddleware = createMiddleware()
  .client(async (context) => {
    try {
      const request = getWebRequest();

      if (!request) {
        return context.next({
          sendContext: {
            locale: baseLocale as Locale,
          },
        });
      }

      const resolvedLocale = await new Promise<Locale>((resolve) =>
        paraglideMiddleware(request, async ({ locale }) => {
          resolve(locale);
        }),
      );

      return context.next({
        sendContext: {
          locale: resolvedLocale,
        },
      });
    } catch {
      return context.next({
        sendContext: {
          locale: getLocale(),
        },
      });
    }
  })
  .server(async (context) => {
    const storage = new AsyncLocalStorage<Locale>();
    overwriteGetLocale(() => storage.getStore() ?? baseLocale);

    return await storage.run(
      context.context.locale,
      async () => await context.next(),
    );
  });
