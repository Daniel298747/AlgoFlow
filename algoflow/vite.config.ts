import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" keeps asset paths relative so the build works on
// Netlify, GitHub Pages, or any static host without extra config.
export default defineConfig({
  plugins: [react()],
  base: "/AlgoFlow/",
});