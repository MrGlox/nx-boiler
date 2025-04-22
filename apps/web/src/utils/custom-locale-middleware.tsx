import { AsyncLocalStorage } from "node:async_hooks";

import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

import {
  type Locale,
  baseLocale,
  getLocale,
  overwriteGetLocale,
} from "@repo/dictionaries/runtime";
import { paraglideMiddleware } from "@repo/dictionaries/server.js";

// Custom cookie name
const CUSTOM_COOKIE_NAME = "custom_locale_cookie";

export const customLocaleMiddleware = createMiddleware()
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

      // Get the locale from the custom cookie
      const cookies = request.headers.get("cookie") || "";
      const cookieMatch = cookies.match(
        new RegExp(`${CUSTOM_COOKIE_NAME}=([^;]+)`),
      );
      const customLocale = cookieMatch ? cookieMatch[1] : null;

      if (customLocale && ["en", "fr"].includes(customLocale)) {
        return context.next({
          sendContext: {
            locale: customLocale as Locale,
          },
        });
      }

      // If no custom cookie, use paraglide middleware
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
