module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/apps/site/mocks-post.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildPost",
    ()=>buildPost,
    "buildPosts",
    ()=>buildPosts
]);
const base = {
    id: 1,
    title: "タイトル",
    body: "本文",
    published_at: new Date().toISOString(),
    status: "published"
};
function buildPost(data) {
    return {
        ...base,
        ...data
    };
}
function buildPosts() {
    return [
        buildPost({
            id: 1,
            title: "短めタイトル",
            published_at: new Date("2025-01-01").toISOString()
        }),
        buildPost({
            id: 2,
            title: "長いタイトル。タイトルにしてはとても長くて改行もするかもしれない。たぶん改行する",
            published_at: new Date("2025-02-26").toISOString()
        }),
        buildPost({
            id: 3,
            title: "This is a title written in English",
            published_at: new Date("2025-04-03").toISOString()
        }),
        buildPost({
            id: 4,
            title: "漢字が多用された堅苦しい印象の記事見出し",
            published_at: new Date("2025-07-15").toISOString()
        }),
        buildPost({
            id: 5,
            title: "やさしいかんじのタイトル",
            published_at: new Date("2025-12-31").toISOString()
        })
    ];
}
}),
"[project]/apps/site/pages/api/mock/_shared.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyCorsHeaders",
    ()=>applyCorsHeaders
]);
const editorOrigin = process.env.NEXT_PUBLIC_EDITOR_URL || "http://localhost:3001";
const applyCorsHeaders = (res)=>{
    res.setHeader("Access-Control-Allow-Origin", editorOrigin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};
}),
"[project]/apps/site/pages/api/mock/admin/posts.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$mocks$2d$post$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/site/mocks-post.ts [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$pages$2f$api$2f$mock$2f$_shared$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/site/pages/api/mock/_shared.ts [api] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = async (req, res)=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$pages$2f$api$2f$mock$2f$_shared$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["applyCorsHeaders"])(res);
    if (req.method === "OPTIONS") {
        res.status(204).end();
        return;
    }
    if (req.method === "GET") {
        res.status(200).json([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$mocks$2d$post$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["buildPost"])(req.body.post)
        ]);
        return;
    }
    if ([
        "POST",
        "PUT"
    ].includes(req.method)) {
        res.status(200).json({
            post: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$mocks$2d$post$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["buildPost"])(req.body.post)
        });
        return;
    }
    throw new Error("mock server does not support this req");
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0b04067f._.js.map