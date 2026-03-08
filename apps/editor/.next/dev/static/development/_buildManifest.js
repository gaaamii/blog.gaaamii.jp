self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "/posts/[id]": [
    "static/chunks/pages/posts/[id].js"
  ],
  "/posts/[id]/edit": [
    "static/chunks/pages/posts/[id]/edit.js"
  ],
  "/posts/new": [
    "static/chunks/pages/posts/new.js"
  ],
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/_app",
    "/_error",
    "/api/mock/cloudinary_signature",
    "/api/mock/user_sessions/ping",
    "/posts/new",
    "/posts/[id]",
    "/posts/[id]/edit"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()