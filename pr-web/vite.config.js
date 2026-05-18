import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable automatic JSX optimization
      jsxImportSource: 'react',
      // Optimize React refresh during development
      fastRefresh: true,
    })
  ],
  
  // Optimization configurations
  build: {
    // Enable minification
    minify: false,

    // Code splitting configuration
    rollupOptions: {
      output: {
        // Split chunks for better caching
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        // Optimize chunk naming for caching
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: ({name}) => {
          name = name || ''
          if (name.endsWith('.css')) {
            return 'css/[name]-[hash][extname]'
          }
          if (/png|jpe?g|gif|svg|webp/.test(name)) {
            return 'images/[name]-[hash][extname]'
          }
          return '[name]-[hash][extname]'
        }
      }
    },

    // CSS optimization
    cssCodeSplit: true,

    // Image optimization
    assetsInlineLimit: 4096, // Inline images smaller than 4KB
    assetsDir: 'assets',

    // Generate source maps only in development
    sourcemap: false,

    // Set target browsers
    target: 'esnext',

    // Report compressed size
    reportCompressedSize: true,
  },

  // Development server optimizations
  server: {
    // Optimize HMR for faster refresh
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
  },

  // Dependency optimization
  optimizeDeps: {
    // Pre-bundle these dependencies for faster page loads
    include: ['react', 'react-dom'],
  },
})
