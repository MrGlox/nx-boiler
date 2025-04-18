import { createServerFn } from "@tanstack/react-start";

import * as m from "@repo/dictionaries/messages";
import { getLocale } from "@repo/dictionaries/runtime";

export const getServerMessage = createServerFn()
  .validator((emoji: string) => emoji)
  .handler((ctx) => {
    return m.server_message({ emoji: ctx.data }, { locale: getLocale() });
  });
