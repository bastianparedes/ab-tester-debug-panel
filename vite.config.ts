import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: './src/main.tsx',
      name: 'ABTesterDebugTool',
      fileName: () => 'script-ui.js',
      formats: ['iife'],
    },
  },
});
