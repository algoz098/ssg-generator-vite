import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(async (ctx) => {
  // const data = await asyncFunction()
  return {

    plugins: [
      vue(),
    ],

    ssgOptions: {
      // script: 'async'
    },
    build: {
      target: 'esnext'
    }

  }
})


