import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.fbx', '**/*.bin'],
  server: {
    port: 3000,
    open: true, // Automatically opens the browser on server start
  },
  build: {
    // Increase chunk size warning limit for heavy 3D dependency trees (like ThreeJS/Rapier)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Code splitting: Separates large modules into independent bundles for faster load times
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor';
            }
            if (id.includes('@dimforge/rapier') || id.includes('glmatrix')) {
              return 'physics-vendor';
            }
            return 'vendor';
          }
        },
      },
    },
  },
})
