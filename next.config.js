module.exports = {
  async redirects() {
    return [
      {
        source: "/feed",
        destination: "/api/feed",
        permanent: true,
      },
    ];
  },
};
