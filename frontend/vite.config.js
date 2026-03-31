import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // To ensure Stacks trnio work, we need these specfi globals
      globals: {
        Buffer: true, 
        global: true,
        process: true,
      },
    }),
  ],
  // If you are deploying to a custom path or have issues with the build output
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})