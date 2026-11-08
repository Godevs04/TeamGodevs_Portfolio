import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiProxyTarget = env.VITE_API_PROXY_TARGET || "http://localhost:5050";

  return {
    envPrefix: ["VITE_", "NEXT_PUBLIC_"],
    server: {
      host: "::",
      port: 8080,
      proxy: {
        "/api": { target: apiProxyTarget, changeOrigin: true },
      },
    },
    preview: {
      proxy: {
        "/api": { target: apiProxyTarget, changeOrigin: true },
      },
    },
    build: {
      target: "es2022",
      cssCodeSplit: true,
      sourcemap: false,
      chunkSizeWarningLimit: 700,
      modulePreload: {
        resolveDependencies: (_filename, deps) =>
          deps.filter(
            (dep) =>
              !dep.includes("vendor-analytics") &&
              !dep.includes("vendor-motion") &&
              !dep.includes("Projects-")
          ),
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("posthog") || id.includes("@microsoft/clarity")) {
                return "vendor-analytics";
              }
              if (id.includes("framer-motion")) {
                return "vendor-motion";
              }
              if (id.includes("@tanstack/react-query")) {
                return "vendor-query";
              }
              if (
                id.includes("/react/") ||
                id.includes("/react-dom/") ||
                id.includes("react-router")
              ) {
                return "vendor-react";
              }
            }
          },
        },
      },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
