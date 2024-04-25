import { defineConfig } from "vite";
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist/static",
  },
  server: {
    proxy: {
      "/api": "http://127.0.0.1:3000",
    },
  },
});
