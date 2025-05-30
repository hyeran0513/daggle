/* eslint-disable no-undef */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isDevelopment = mode === "development";

  return {
    plugins: [react()],
    server: isDevelopment
      ? {
          proxy: {
            "/api": {
              target: env.VITE_SERVER_URL,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ""),
            },
          },
        }
      : undefined,
  };
});
