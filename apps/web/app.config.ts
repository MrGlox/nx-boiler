import path from "node:path";

import { defineConfig } from "@tanstack/react-start/config";
import tailwindcss from "@tailwindcss/vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";

export default defineConfig({
  tsr: {
    appDirectory: "apps/web/src",
  },
  routers: {
    public: {
      dir: "apps/web/public",
    },
  },
  vite: {
    cacheDir: "node_modules/.vite/apps/web",
    resolve: {
      alias: {
        "@": path.resolve("apps/web/src"),
        "@repo/database": path.resolve("libs/database/src/index.ts"),
        "@repo/dictionaries": path.resolve(
          "libs/shared/dictionaries/src/paraglide",
        ),
        "@repo/styles": path.resolve("libs/ui/src/styles"),
        "@repo/ui": path.resolve("libs/ui/src/components/index.gen.ts"),
      },
    },
    plugins: [
      nxViteTsPaths(),
      TanStackRouterVite({
        target: "react",
        autoCodeSplitting: true,
      }),
      paraglideVitePlugin({
        project: path.resolve("libs/shared/dictionaries/project.inlang"),
        outdir: path.resolve("libs/shared/dictionaries/src/paraglide"),
        cookieName: "locale",
      }),
      tailwindcss(),
    ],
    build: {
      outDir: "../../dist/apps/web",
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  },
});
