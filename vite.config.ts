import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), glsl()],
  server: {
    proxy: {
      "/pdf-proxy": {
        target: "https://www.adobe.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pdf-proxy/, ""),
      },
    },
  },
});
