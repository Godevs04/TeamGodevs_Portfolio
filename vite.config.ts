import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

function apiDevPlugin(env: Record<string, string>): Plugin {
  return {
    name: "api-dev",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith("/api/")) {
          next();
          return;
        }

        if (req.url.startsWith("/api/geo")) {
          if (req.method !== "GET") {
            res.statusCode = 405;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Method not allowed" }));
            return;
          }

          void (async () => {
            try {
              const { detectCountryFromHeaders } = await import("./server/geo/detect-country");
              const { resolvePricingRegion } = await import("./src/lib/pricing/regions");
              const devCountry = env.DEV_VIEWER_COUNTRY?.trim().toUpperCase();
              const country =
                devCountry ||
                detectCountryFromHeaders(
                  req.headers as Record<string, string | string[] | undefined>
                );

              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  country,
                  region: resolvePricingRegion(country),
                })
              );
            } catch (error) {
              console.error("Geo API dev error:", error);
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ message: "Internal server error" }));
            }
          })();
          return;
        }

        if (!req.url.startsWith("/api/contact")) {
          next();
          return;
        }

        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        let body = "";
        req.on("data", (chunk: Buffer) => {
          body += chunk.toString();
        });

        req.on("end", async () => {
          try {
            Object.assign(process.env, env);
            const { handleContactSubmission } = await import("./server/contact/handler");
            const { extractRequestMeta } = await import("./server/contact/request-meta");
            const parsedBody = body ? JSON.parse(body) : {};
            const meta = extractRequestMeta({
              headers: req.headers as Record<string, string | string[] | undefined>,
              socketRemoteAddress: req.socket?.remoteAddress,
            });
            const result = await handleContactSubmission(parsedBody, meta);

            res.statusCode = result.ok ? 200 : result.status;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify(result.ok ? { ok: true } : { message: result.message })
            );
          } catch (error) {
            console.error("Contact API dev error:", error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ message: "Internal server error" }));
          }
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    envPrefix: ["VITE_", "NEXT_PUBLIC_"],
    server: {
      host: "::",
      port: 8080,
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
    plugins: [
      react(),
      apiDevPlugin(env),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
