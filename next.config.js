/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// const mode = !process.env.RUNNING_TESTS === "true" ? "standalone" : undefined;
// if (mode) {
// nextConfig.standalone = mode;
// }

module.exports = nextConfig;
