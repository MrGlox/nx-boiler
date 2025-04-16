import * as m from "@/paraglide/messages.js";
import { getLocale } from "@/paraglide/runtime";
import { createServerFn } from "@tanstack/react-start";

export const getServerMessage = createServerFn()
  .validator((emoji: string) => emoji)
  .handler((ctx) => {
    return m.server_message({ emoji: ctx.data }, { locale: getLocale() });
  });
