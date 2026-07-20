import {defineConfig, loadEnv} from 'vite'
import react, {reactCompilerPreset} from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path, {resolve} from "path"
import {ghPages} from "vite-plugin-gh-pages"

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  const allowedHostsArray = env.VITE_ALLOWED_HOSTS ? env.VITE_ALLOWED_HOSTS.split(",") : [];

  return {
    server: {
      host: "0.0.0.0",
      port: 3000,
      allowedHosts: allowedHostsArray
    },
    base: "/GTNH-OC-Web-Configurator/",
    plugins: [
      react(),
      ghPages(),
      babel({presets: [reactCompilerPreset()]})
    ],
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
    css: {
      modules: {
        localsConvention: "dashes"
      }
    },
  };
})
