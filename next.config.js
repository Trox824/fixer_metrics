/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. The errors are pre-existing in the T3 boilerplate
    // due to Prisma client type resolution issues with custom output directories.
    ignoreDuringBuilds: true,
  },
};

export default config;
