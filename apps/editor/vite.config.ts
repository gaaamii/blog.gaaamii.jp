import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const mockApiOrigin = process.env.EDITOR_MOCK_API_ORIGIN || "http://127.0.0.1:3005";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/mock": {
        target: mockApiOrigin,
        changeOrigin: true,
      },
    },
  },
});
