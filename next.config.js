/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: !process.env.RUNNING_TESTS === "true" ? "standalone" : undefined,
};

module.exports = nextConfig;
