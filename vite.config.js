import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  // manualChunks separaría recharts, framer-motion y react en chunks
  // independientes para que el navegador los cachee y no se redescarguen
  // en visitas posteriores (ahorro ~380 KB en /admin/estadisticas)
})
