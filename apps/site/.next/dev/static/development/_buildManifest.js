self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "/_error": [
    "static/chunks/pages/_error.js"
  ],
  "/posts/[id]": [
    "static/chunks/pages/posts/[id].js"
  ],
  "__rewrites": {
    "afterFiles": [
      {
        "source": "/feed",
        "destination": "/api/feed"
      }
    ],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/404",
    "/_app",
    "/_error",
    "/about",
    "/api/feed",
    "/api/mock/_shared",
    "/api/mock/admin/posts",
    "/api/mock/admin/posts/[id]",
    "/api/mock/posts",
    "/api/mock/posts/[id]",
    "/api/revalidate",
    "/posts/[id]"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()