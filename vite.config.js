import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // esbuild: {
  //   drop: ['console', 'debugger'],
  // } // to drop all console statements from all components.,
  plugins: [react()],
})
