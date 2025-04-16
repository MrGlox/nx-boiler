import { localeMiddleware } from "@/utils/locale-middleware";
import { registerGlobalMiddleware } from "@tanstack/react-start";

registerGlobalMiddleware({
  middleware: [localeMiddleware],
});
