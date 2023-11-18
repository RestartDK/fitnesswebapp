import { defineConfig } from 'vite'
import path from "path"
import { splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: { manifest: true },
  base: process.env.NODE_ENV === "production" ? "/static/" : "/",
  root: "./frontend",
})