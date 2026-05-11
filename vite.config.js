import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
      jsxImportSource: "react",
    }),
  ],
  // Dev JSX is often transformed by esbuild; without this, JSX becomes React.createElement()
  // without a React binding in scope → "React is not defined" in every .jsx file.
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
});
