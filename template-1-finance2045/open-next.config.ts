import type { OpenNextConfig } from "@opennextjs/cloudflare";

// @opennextjs/cloudflare v1.19.9 ensureCloudflareConfig() validates every
// field below and throws if any is missing — the full shape is mandatory.
const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy",
    },
  },
  // node:crypto must be treated as an edge external for the middleware bundle.
  edgeExternals: ["node:crypto"],
  middleware: {
    // external: true is required by the v1.19.9 validator even when the
    // project has no middleware.ts — createMiddleware() handles the
    // no-middleware case gracefully at build time.
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy",
    },
  },
};

export default config;
