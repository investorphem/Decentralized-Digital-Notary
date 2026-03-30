import { defineConfig } from 'vite'
import react from '@vitejs/plugin-rect
import { nodePolyfills } from 'vite-plugi-oolls
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(
      // To ensure Stacks transacio
      globals:
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
