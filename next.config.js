module.exports = {
  async rewrites() {
    return [
      {
        source: "/feed",
        destination: "/api/feed",
        permanent: true,
      },
    ];
  },
};
