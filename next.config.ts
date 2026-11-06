import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Η εικόνα κοινοποίησης διαβάζει τα αρχεία της Commissioner από το @fontsource.
     Το tracing τα κρατά μαζί με τη διαδρομή, ακόμη κι αν πάψει να είναι στατική. */
  outputFileTracingIncludes: {
    "/opengraph-image": ["./node_modules/@fontsource/commissioner/files/*.woff"],
  },
};

export default nextConfig;
