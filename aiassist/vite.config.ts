import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  // original stuff
  // server: {
  //   open: true,
  // },
  // for docker
  server: {
    watch: {
      usePolling: true,
    },
    host: "0.0.0.0", // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 5174, // you can replace this port with any port
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
})
