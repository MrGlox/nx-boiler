// apps/web/app.config.ts
import { nxCopyAssetsPlugin } from "@nx/vite/plugins/nx-copy-assets.plugin";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { defineConfig } from "@tanstack/react-start/config";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import path from "node:path";
var app_config_default = defineConfig({
  tsr: {
    appDirectory: "apps/web/src"
  },
  vite: {
    cacheDir: "../../node_modules/.vite/apps/web",
    server: {
      port: 4200,
      host: "localhost"
    },
    preview: {
      port: 4300,
      host: "localhost"
    },
    plugins: [
      TanStackRouterVite({ autoCodeSplitting: true }),
      nxViteTsPaths(),
      nxCopyAssetsPlugin(["*.md"]),
      tsConfigPaths()
    ],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
        "@": path.resolve(__dirname, "src"),
        "@/components": path.resolve(__dirname, "src/components")
      }
    },
    build: {
      outDir: "../../dist/apps/web",
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true
      }
    }
  }
});
export {
  app_config_default as default
};
