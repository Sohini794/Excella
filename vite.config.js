import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // Tailwind CSS is normally handled via postcss.config.js
// export default defineConfig({
//   plugins: [react()],
//   base: './', // relative paths so production build works anywhere
// })
