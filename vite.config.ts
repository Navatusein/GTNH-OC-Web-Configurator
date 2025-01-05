import {defineConfig} from "vite"
import path from "path"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  base: "/GTNH-OC-Web-Configurator/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
