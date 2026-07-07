import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const nodeRequire = createRequire(import.meta.url);
const ibmPlexRoot = dirname(nodeRequire.resolve('@ibm/plex/package.json'));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~@ibm\/plex/,
        replacement: ibmPlexRoot
      }
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    lib: {
      entry: './src/index.js',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@carbon/react', '@carbon/icons-react']
    }
  }
});
