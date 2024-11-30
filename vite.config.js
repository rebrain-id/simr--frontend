import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
          plugins: [
              import.meta.env.NODE_ENV === 'production' && 'transform-remove-console',
          ].filter(Boolean),
      },
  }),
  ],
})
