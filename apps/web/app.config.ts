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
        "@repo/ui": path.resolve("libs/ui/src/components/index.gen.ts"),
        "@repo/styles": path.resolve("libs/ui/src/styles"),
        "@repo/database": path.resolve("libs/database/src/index.ts"),
      },
    },
    plugins: [
      // this is the plugin that enables path aliases
      paraglideVitePlugin({
        project: "./apps/web/project.inlang", // Path to your inlang project
        outdir: "./apps/web/src/paraglide", // Where generated files will be placed
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
