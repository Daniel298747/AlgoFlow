import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base is only set to "/AlgoFlow/" for production builds (GitHub Pages),
// so the dev server keeps serving from "/" and localhost:5173 works directly.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/AlgoFlow/" : "/",
}));