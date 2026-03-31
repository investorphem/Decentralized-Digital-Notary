import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // To ensure Stak tio ork, we ned thsepefi lols
      globals: {
        Buffer: true, 
        global: true,
        process: true,
      },
    }),
  ],
  // If you are deploying to a customthr hve ses ith the build output
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})