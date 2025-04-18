/// <reference types="vinxi/types/client" />

import { StartClient } from "@tanstack/react-start";
import { hydrateRoot } from "react-dom/client";
import {
  getLocale,
  overwriteGetLocale,
  strategy,
} from "@repo/dictionaries/runtime";
import { createRouter } from "./router";

const router = createRouter();

/**
 * BEGINING
 * This is to make sure locale is not pulled from a cookie to prevent weird behaviour when the language was changed manually in the cookie or in another tab. If you don't rely on cookies for locale, you can remove this line.
 */
if (strategy.includes("cookie")) {
  const inMemoryLocale = getLocale();
  overwriteGetLocale(() => inMemoryLocale);
}
/**
 * END
 */

hydrateRoot(document, <StartClient router={router} />);
