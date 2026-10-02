import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // While developing, allow the site to be opened from other devices on the
  // same Wi-Fi (e.g. http://192.168.0.169:3000 on a phone). Without this the
  // page loads over the network address but its scripts are blocked, so it
  // cannot be scrolled or clicked. These are private home/office address ranges.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*"],

  images: {
    // While developing (`npm run dev`), serve images straight from /public so
    // a replaced file shows on the next refresh, even under the same name.
    // The live site still gets resized, optimised images.
    unoptimized: process.env.NODE_ENV === "development",
    // How long an optimised image is cached, in seconds.
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
