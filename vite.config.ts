import {defineConfig} from "vite"
import path, { resolve } from "path"
import react from "@vitejs/plugin-react"
import {ghPages} from "vite-plugin-gh-pages"

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  base: "/GTNH-OC-Web-Configurator/",
  plugins: [react(), ghPages()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        404: resolve(__dirname, "public/404.html"),
      },
    },
  },
})
