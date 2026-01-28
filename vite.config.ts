import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/lixi/', // Phải có dấu gạch chéo ở đầu và cuối
})
