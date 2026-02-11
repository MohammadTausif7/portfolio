import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// If you use GitHub Pages, set base to "/<REPO_NAME>/"
// Example: base: "/tausif-portfolio/"
// Otherwise, keep base unset.
export default defineConfig({
    plugins: [react()],
    server: { port: 5173 }
});