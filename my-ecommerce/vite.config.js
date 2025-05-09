import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envcompatible from "vite-plugin-env-compatible"
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  envPrefix:"REACT_APP_",
  plugins: [react(), tailwindcss(), envcompatible()],
})
