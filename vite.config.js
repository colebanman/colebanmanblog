import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Serve index.html for all routes to enable HTML5 history API
    historyApiFallback: true,
  },
})
