import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactSvgPlugin from "vite-plugin-react-svg";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactSvgPlugin()],
  base: process.env.NODE_ENV === "production" ? "/cube-cafe/" : "/",
  define: {
    // Some libraries use the global object, even though it doesn't exist in the browser.
    // Alternatively, we could add `<script>window.global = window;</script>` to index.html.
    // https://github.com/vitejs/vite/discussions/5912
    global: {},
  },
});
