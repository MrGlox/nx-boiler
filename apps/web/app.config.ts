import { defineConfig } from "@tanstack/react-start/config";
import tailwindcss from "@tailwindcss/vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";

import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import tsConfigPaths from "vite-tsconfig-paths";

import path from "node:path";

export default defineConfig({
  tsr: {
    appDirectory: "apps/web/src",
  },
  vite: {
    cacheDir: "../../node_modules/.vite/apps/web",
    resolve: {
      alias: {
        "@": path.resolve("apps/web/src"),
        "@repo/database": path.resolve("libs/database/src/index.ts"),
        "@repo/dictionaries": path.resolve(
          "libs/shared/dictionaries/src/paraglide",
        ),
        "@repo/styles": path.resolve("libs/ui/src/styles"),
        "@repo/ui": path.resolve("libs/ui/src/components/index.gen.ts"),
        // "@repo/dictionaries/runtime": path.resolve(
        //   "libs/shared/dictionaries/src/paraglide/runtime.js",
        // ),
        // "@repo/dictionaries/messages": path.resolve(
        //   "libs/shared/dictionaries/src/paraglide/messages.js",
        // ),
      },
    },
    plugins: [
      // this is the plugin that enables path aliases
      paraglideVitePlugin({
        project: path.resolve("libs/shared/dictionaries/project.inlang"), // Path to your inlang project
        outdir: path.resolve("libs/shared/dictionaries/src/paraglide"), // Where generated files will be placed
      }),
      tailwindcss(),
      nxViteTsPaths(),
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
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
