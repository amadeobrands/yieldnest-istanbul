/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config) => {
    config.externals.push(
      "pino-pretty",
      "lokijs",
      "encoding",
      "node-gyp-build"
    );
  return config;
  }
}

module.exports = nextConfig
