/// <reference types='vitest' />
import * as path from 'node:path';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import react from '@vitejs/plugin-react-swc';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/ui',
  plugins: [
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.json'),
    }),
  ],
  resolve: {
    alias: {
      '@repo/ui': path.resolve(__dirname, './src/components/index.gen.ts'),
      '@repo/ui/': path.resolve(__dirname, './src/components/ui/'),
      '@repo/utils': path.resolve(__dirname, '../utils/src/index.ts'),
    },
  },
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: '../../dist/libs/ui',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    // lib: {
    //   // Could also be a dictionary or array of multiple entry points.
    //   entry: 'src/components',
    //   name: 'ui',
    //   fileName: 'index',
    //   // Change this to the formats you want to support.
    //   // Don't forget to update your package.json as well.
    //   formats: ['es' as const],
    // },
    // rollupOptions: {
    //   // External packages that should not be bundled into your library.
    //   external: ['react', 'react-dom', 'react/jsx-runtime'],
    // },
  },
}));
