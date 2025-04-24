import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  appType: 'spa' // 👈 required for React Router to handle refreshes
})
