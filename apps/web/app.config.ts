import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from '@tanstack/react-start/config';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  tsr: {
    appDirectory: 'apps/web/src',
  },
  vite: {
    cacheDir: '../../node_modules/.vite/apps/web',
    server: {
      port: 4200,
      host: 'localhost',
    },
    preview: {
      port: 4300,
      host: 'localhost',
    },
    plugins: [
      TanStackRouterVite(),
      nxViteTsPaths(),
      nxCopyAssetsPlugin(['*.md']),
      tsConfigPaths(),
    ],
    resolve: {
      alias: {
        '~': path.resolve('apps/web/src'),
        '@': path.resolve('apps/web/src'),
        '@/components': path.resolve('apps/web/src/components'),
      },
    },
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
