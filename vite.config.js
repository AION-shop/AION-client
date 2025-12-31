import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',              // ✅ Render uchun muhim
    port: process.env.PORT || 3000, // ✅ Render PORT env dan oladi
    historyApiFallback: true,
  },
  preview: {
    host: '0.0.0.0',              // ✅ Preview ham tashqaridan ochiq
    port: process.env.PORT || 3000,
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  base: './',
})
