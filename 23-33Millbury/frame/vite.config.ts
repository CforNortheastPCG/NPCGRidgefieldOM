import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // The render pipeline serves built books under /api/books/:id/preview/ —
  // the DO sets AUTOOM_BASE in the container so asset URLs resolve there.
  base: process.env.AUTOOM_BASE ?? '/',
  server: { port: 5180 },
  build: { chunkSizeWarningLimit: 1200 },
})
