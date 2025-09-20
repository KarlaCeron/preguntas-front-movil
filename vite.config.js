import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // 👈 Aquí forzamos que el front móvil use el puerto 5173
  },
})