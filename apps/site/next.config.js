const path = require("path");

module.exports = {
  experimental: {
    externalDir: true,
  },
  outputFileTracingRoot: path.join(__dirname, "../.."),
  async rewrites() {
    return [
      {
        source: "/feed",
        destination: "/api/feed",
      },
    ];
  },
};
