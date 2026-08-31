import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Served at https://justdheja.github.io/the-invitation/ — must match the
  // repo name so built asset URLs resolve correctly under GitHub Pages.
  base: '/the-invitation/',
})
