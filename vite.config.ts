import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Tên repository của bạn là 'lixi', nên base phải để như sau:
  base: '/lixi/', 
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
})
