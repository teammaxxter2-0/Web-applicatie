import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
        '/api': {
            target: 'http://localhost:5018',
            rewrite: (path: string) => path.replace(/^\/api/, ''),
         },
         '/ai': {
            target: 'http://localhost:3000',
            rewrite: (path: string) => path.replace(/^\/ai/, ''),
         },
    }
  }
})
