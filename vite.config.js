import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        game1: 'game-1.html',
        game2: 'game-2.html',
        game3: 'game-3.html',
      },
    },
  },
});