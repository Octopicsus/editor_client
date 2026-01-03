import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { PORT } from './config/port'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: PORT,
    strictPort: true,
  },
})
