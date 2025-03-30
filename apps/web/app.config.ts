import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from '@tanstack/react-start/config';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  tsr: {
    appDirectory: 'apps/web/src',
  },
  vite: {
    cacheDir: '../../node_modules/.vite/apps/web',
    plugins: [
      TanStackRouterVite({
        target: 'react',
        generatedRouteTree: 'apps/web/src/routeTree.gen.ts',
        routesDirectory: 'apps/web/src/routes',
      }),
      nxViteTsPaths(),
      tailwindcss(),
      nxCopyAssetsPlugin(['*.md']),
      tsConfigPaths({
        root: 'apps/web',
        projects: ['./tsconfig.json'],
      }),
    ],
    build: {
      outDir: '../../dist/apps/web',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  },
});
