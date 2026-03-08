module.exports = [
"[project]/apps/site/components/feature/PostLink/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostLink",
    ()=>PostLink
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
;
;
const PostLink = ({ href, post })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
        className: "font-bold text-lg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            className: "block m-0 py-4 px-4 rounded-lg sm:py-2 hover:bg-neutral-200 hover:text-sky-600 focus:text-sky-600 active:text-sky-700 dark:active:bg-neutral-800 dark:hover:bg-neutral-800 dark:focus:text-white dark:hover:text-white dark:active:text-white",
            children: post.title
        }, void 0, false, {
            fileName: "[project]/apps/site/components/feature/PostLink/index.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/site/components/feature/PostLink/index.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/packages/utils/environment.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isDevelopment",
    ()=>isDevelopment,
    "isProduction",
    ()=>isProduction
]);
function isProduction() {
    return ("TURBOPACK compile-time value", "development") === "production";
}
function isDevelopment() {
    return ("TURBOPACK compile-time value", "development") === "development";
}
}),
"[project]/apps/site/lib/api.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "get",
    ()=>get
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$utils$2f$environment$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/utils/environment.ts [ssr] (ecmascript)");
;
const PROD_API_BASE_URL = process.env.NEXT_PUBLIC_SITE_API_BASE_URL || "https://api.gaaamii.jp";
const DEV_API_BASE_URL = process.env.SITE_API_BASE_URL || "http://localhost:3000/api/mock";
function getAPIBaseURL() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$utils$2f$environment$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["isDevelopment"])() ? DEV_API_BASE_URL : PROD_API_BASE_URL;
}
const requestInitBase = {
    mode: "cors",
    credentials: "include",
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    }
};
async function get(path) {
    return request(path, {
        ...requestInitBase,
        method: "GET"
    });
}
async function request(path, init) {
    return fetch(`${getAPIBaseURL()}${path}`, init);
}
}),
"[project]/apps/site/components/feature/Main/styles.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "root": "styles-module__yETTza__root",
});
}),
"[project]/apps/site/components/feature/Main/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$Main$2f$styles$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/apps/site/components/feature/Main/styles.module.css [ssr] (css module)");
;
;
const Main = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$Main$2f$styles$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].root} mx-auto sm:my-8`,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/site/components/feature/Main/index.tsx",
        lineNumber: 4,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const __TURBOPACK__default__export__ = Main;
}),
"[project]/apps/site/components/feature/Footer/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FooterLink",
    ()=>FooterLink,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
;
;
const Footer = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
        className: "bg-black py-20 underline text-center text-white flex justify-center gap-8 sm:gap-10 flex-col sm:flex-row sm:text-center",
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/site/components/feature/Footer/index.tsx",
        lineNumber: 4,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const __TURBOPACK__default__export__ = Footer;
const FooterLink = ({ children, href })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "w-60 flex gap-1 mx-auto sm:w-auto py-4",
            children: children
        }, void 0, false, {
            fileName: "[project]/apps/site/components/feature/Footer/index.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/site/components/feature/Footer/index.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/packages/ui/icons/RSS.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This component uses Heroicons svg.
// Heroicons is licensed under the MIT License
// https://github.com/tailwindlabs/heroicons/blob/master/LICENSE
__turbopack_context__.s([
    "RSSIcon",
    ()=>RSSIcon
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
const RSSIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "w-6 h-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12.75 19.5v-.75a7.5 7.5 0 0 0-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        }, void 0, false, {
            fileName: "[project]/packages/ui/icons/RSS.tsx",
            lineNumber: 13,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/packages/ui/icons/RSS.tsx",
        lineNumber: 5,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
}),
"[project]/packages/ui/icons/InformationCircle.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This component uses Heroicons svg.
// Heroicons is licensed under the MIT License
// https://github.com/tailwindlabs/heroicons/blob/master/LICENSE
__turbopack_context__.s([
    "InformationCircleIcon",
    ()=>InformationCircleIcon
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
const InformationCircleIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "w-6 h-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        }, void 0, false, {
            fileName: "[project]/packages/ui/icons/InformationCircle.tsx",
            lineNumber: 13,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/packages/ui/icons/InformationCircle.tsx",
        lineNumber: 5,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
}),
"[project]/packages/ui/icons/ArrowUp.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This component uses Heroicons svg.
// Heroicons is licensed under the MIT License
// https://github.com/tailwindlabs/heroicons/blob/master/LICENSE
__turbopack_context__.s([
    "ArrowUpIcon",
    ()=>ArrowUpIcon
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
const ArrowUpIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "w-6 h-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
        }, void 0, false, {
            fileName: "[project]/packages/ui/icons/ArrowUp.tsx",
            lineNumber: 13,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/packages/ui/icons/ArrowUp.tsx",
        lineNumber: 5,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
}),
"[project]/apps/site/components/feature/NavigationHeader/styles.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "logo": "styles-module__WQwzaG__logo",
  "navigationList": "styles-module__WQwzaG__navigationList",
  "navigationListItem": "styles-module__WQwzaG__navigationListItem",
  "navigationListItem--isPrimary": "styles-module__WQwzaG__navigationListItem--isPrimary",
  "utilityItem": "styles-module__WQwzaG__utilityItem",
});
}),
"[project]/apps/site/components/feature/Avatar/styles.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "avatar": "styles-module__skVrrG__avatar",
});
}),
"[project]/apps/site/components/feature/Avatar/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GaaamiiAvatar",
    ()=>GaaamiiAvatar
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$classnames__$5b$external$5d$__$28$classnames$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$classnames$29$__ = __turbopack_context__.i("[externals]/classnames [external] (classnames, cjs, [project]/node_modules/classnames)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$Avatar$2f$styles$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/apps/site/components/feature/Avatar/styles.module.css [ssr] (css module)");
;
;
;
const GaaamiiAvatar = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
        role: "img",
        "aria-label": "gaaamiiのアイコン画像",
        viewBox: "0 0 180 180",
        width: 40,
        height: 40,
        className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$classnames__$5b$external$5d$__$28$classnames$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$classnames$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$Avatar$2f$styles$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].avatar),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("g", {
            transform: "translate(0,180) scale(0.1,-0.1)",
            fill: "#000",
            stroke: "none",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                    d: "M760 1441 c-66 -10 -126 -41 -202 -102 -62 -51 -75 -68 -110 -158 -33 -85 -16 -251 34 -326 44 -66 114 -132 164 -152 38 -16 44 -22 44 -49 0 -20 -9 -39 -26 -55 -40 -36 -75 -93 -176 -288 -38 -72 -49 -136 -28 -157 6 -6 4 -28 -6 -62 -9 -30 -14 -56 -11 -59 13 -12 25 10 31 58 7 49 8 51 34 44 35 -9 33 -6 22 -46 -12 -42 -13 -69 -1 -69 4 0 12 28 18 63 l9 62 8 -62 c11 -83 27 -81 19 2 -5 55 -3 65 10 65 21 0 75 46 92 80 35 69 46 148 34 259 -5 46 -8 86 -5 88 2 2 24 -6 48 -18 63 -33 143 -29 246 11 45 17 84 36 87 41 19 29 25 -4 25 -129 0 -135 1 -140 30 -194 16 -30 42 -68 56 -83 25 -27 26 -33 20 -92 -4 -34 -9 -70 -13 -79 -4 -12 -2 -15 8 -12 9 3 18 30 24 73 9 63 11 67 26 52 9 -8 19 -34 23 -56 3 -23 11 -41 16 -41 13 0 13 14 -2 62 -10 35 -9 41 9 60 l21 20 22 -66 c12 -36 26 -64 31 -60 14 8 11 25 -16 79 -18 36 -21 51 -12 57 29 18 -109 339 -184 428 -52 62 -52 92 2 145 72 70 83 103 85 243 2 124 -7 182 -42 277 -24 62 -51 87 -134 121 -55 23 -82 27 -175 30 -60 1 -130 -1 -155 -5z m185 -11 c3 -5 -18 -34 -47 -64 -29 -30 -53 -61 -53 -68 0 -7 -8 -13 -17 -13 -10 0 -18 5 -17 10 0 6 7 9 14 7 9 -2 13 3 10 10 -3 8 8 27 25 43 16 16 30 33 30 39 0 12 30 46 41 46 4 0 11 -4 14 -10z m-181 -12 c-6 -10 -4 -10 7 0 7 7 37 12 69 11 30 0 49 -3 43 -6 -7 -2 -13 -12 -13 -20 0 -19 -119 -135 -131 -127 -16 10 -9 20 44 59 65 49 81 65 74 71 -2 3 -19 -7 -36 -21 -33 -29 -40 -23 -15 13 19 28 10 28 -24 1 -16 -12 -26 -30 -27 -47 0 -19 -6 -28 -20 -30 -27 -6 -46 -22 -38 -34 3 -6 0 -8 -8 -6 -8 3 -27 -1 -42 -9 -57 -29 -37 -3 32 41 70 45 88 62 54 49 -16 -6 -16 -4 1 15 11 12 14 22 9 22 -11 0 -27 -29 -24 -43 1 -5 -3 -5 -9 -2 -7 4 -21 -2 -33 -13 -12 -11 -33 -25 -45 -32 -45 -23 -32 -3 25 41 32 23 64 51 71 61 15 20 47 25 36 6z m290 -7 c7 -10 -80 -91 -97 -91 -6 0 7 16 29 36 21 19 33 33 27 29 -15 -7 -16 -4 -7 19 7 17 39 22 48 7z m-386 -34 c-78 -66 -108 -87 -119 -87 -18 0 28 46 80 81 52 34 78 38 39 6z m287 -27 c-38 -39 -71 -57 -82 -46 -6 5 41 48 86 78 40 27 38 11 -4 -32z m151 39 c4 -7 0 -15 -9 -20 -8 -5 -34 -25 -57 -44 -32 -26 -51 -35 -78 -35 -37 1 -37 1 26 30 34 16 62 35 62 42 0 30 41 50 56 27z m39 -19 c8 -13 -31 -47 -62 -56 -13 -3 -21 -10 -18 -15 8 -12 -66 -59 -95 -59 -23 0 -21 2 15 24 22 14 62 45 90 70 52 48 60 52 70 36z m35 -35 c0 -13 -59 -58 -97 -72 -13 -5 -13 -2 2 21 10 15 24 25 31 22 8 -3 13 -1 11 4 -2 9 32 39 46 40 4 0 7 -7 7 -15z m40 -94 c30 -98 34 -319 6 -371 -25 -48 -84 -108 -127 -130 -44 -23 -194 -60 -242 -60 -74 0 -208 39 -257 75 -130 96 -181 263 -129 428 27 86 48 114 75 99 13 -7 26 -7 35 -1 25 16 33 10 13 -12 -12 -14 -25 -18 -41 -14 -13 3 -23 1 -23 -5 0 -21 31 -22 78 -4 55 22 119 26 99 7 -7 -7 -36 -18 -65 -26 -29 -7 -49 -16 -46 -20 13 -13 41 -7 90 20 50 27 103 39 212 50 42 3 62 2 62 -6 0 -15 -45 -25 -83 -17 -24 5 -29 4 -20 -5 7 -7 34 -16 60 -20 63 -10 213 24 246 57 12 12 25 22 29 23 4 1 17 -30 28 -68z m-88 -578 c21 -25 -178 -103 -265 -104 -51 -1 -79 7 -145 38 -26 12 -30 18 -21 29 6 8 9 25 7 39 -3 14 -5 25 -4 25 0 0 23 -7 50 -15 27 -8 72 -15 100 -15 55 0 186 29 232 52 28 13 29 12 32 -12 2 -14 8 -30 14 -37z m103 -155 c41 -80 115 -267 115 -290 0 -5 -6 -8 -13 -8 -8 0 -22 -9 -32 -20 -18 -19 -54 -28 -56 -12 -5 46 -7 75 -9 120 -3 54 -19 73 -21 25 -2 -67 -30 67 -30 144 1 45 -4 85 -9 88 -12 8 -13 45 -1 45 4 0 30 -42 56 -92z m-536 -105 c1 -23 -3 -45 -9 -48 -6 -4 -9 31 -8 92 1 84 2 91 9 48 4 -27 8 -69 8 -92z m-70 -28 c0 -22 -11 -64 -25 -95 l-25 -55 6 60 c5 49 3 57 -7 47 -8 -8 -14 -46 -17 -93 -4 -91 -13 -101 -66 -76 l-34 16 16 53 c19 65 41 110 59 121 8 4 14 12 14 18 0 5 15 39 33 76 l32 67 7 -49 c3 -28 6 -68 7 -90z m540 53 c-1 -49 -2 -50 -9 -19 -4 18 -6 41 -5 50 5 22 4 21 10 21 3 0 5 -24 4 -52z m-519 -158 c0 -5 -5 -10 -12 -10 -6 0 -9 -3 -5 -6 5 -5 -28 -44 -38 -44 -2 0 6 16 18 35 22 34 37 44 37 25z"
                }, void 0, false, {
                    fileName: "[project]/apps/site/components/feature/Avatar/index.tsx",
                    lineNumber: 14,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                    d: "M693 1142 c-29 -14 -53 -32 -53 -39 0 -9 15 -6 50 12 27 14 56 25 65 25 8 0 15 7 15 15 0 21 -17 18 -77 -13z"
                }, void 0, false, {
                    fileName: "[project]/apps/site/components/feature/Avatar/index.tsx",
                    lineNumber: 15,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                    d: "M990 1154 c0 -5 104 -54 115 -54 3 0 5 5 5 10 0 6 -21 20 -46 30 -45 20 -74 25 -74 14z"
                }, void 0, false, {
                    fileName: "[project]/apps/site/components/feature/Avatar/index.tsx",
                    lineNumber: 16,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                    d: "M958 955 c-3 -3 -51 -6 -106 -7 -56 -1 -102 -5 -102 -10 0 -10 16 -11 120 -9 94 2 123 8 115 22 -7 10 -19 12 -27 4z"
                }, void 0, false, {
                    fileName: "[project]/apps/site/components/feature/Avatar/index.tsx",
                    lineNumber: 17,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/apps/site/components/feature/Avatar/index.tsx",
            lineNumber: 13,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/site/components/feature/Avatar/index.tsx",
        lineNumber: 5,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
}),
"[project]/packages/ui/tw.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cx",
    ()=>cx,
    "twAlignToItemsClass",
    ()=>twAlignToItemsClass,
    "twBorderWidthToClass",
    ()=>twBorderWidthToClass,
    "twColorToClass",
    ()=>twColorToClass,
    "twJustifyToClass",
    ()=>twJustifyToClass,
    "twMaxWidthToClass",
    ()=>twMaxWidthToClass,
    "twRadiusToClass",
    ()=>twRadiusToClass,
    "twSpacingToClass",
    ()=>twSpacingToClass
]);
const twSpacingToClass = (prefix, value)=>{
    if (!value) {
        return undefined;
    }
    const spacingClasses = {
        "0": `${prefix}-0`,
        "0.5": `${prefix}-0.5`,
        "1": `${prefix}-1`,
        "1.5": `${prefix}-1.5`,
        "2": `${prefix}-2`,
        "2.5": `${prefix}-2.5`,
        "3": `${prefix}-3`,
        "3.5": `${prefix}-3.5`,
        "4": `${prefix}-4`,
        "5": `${prefix}-5`,
        "6": `${prefix}-6`,
        "7": `${prefix}-7`,
        "8": `${prefix}-8`,
        "9": `${prefix}-9`,
        "10": `${prefix}-10`,
        "11": `${prefix}-11`,
        "12": `${prefix}-12`,
        "14": `${prefix}-14`,
        "16": `${prefix}-16`,
        "20": `${prefix}-20`,
        "24": `${prefix}-24`,
        "28": `${prefix}-28`,
        "32": `${prefix}-32`,
        "36": `${prefix}-36`,
        "40": `${prefix}-40`,
        "44": `${prefix}-44`,
        "48": `${prefix}-48`,
        "52": `${prefix}-52`,
        "56": `${prefix}-56`,
        "60": `${prefix}-60`,
        "64": `${prefix}-64`,
        "72": `${prefix}-72`,
        "80": `${prefix}-80`,
        "96": `${prefix}-96`
    };
    return spacingClasses[value];
};
const twAlignToItemsClass = (align)=>{
    if (!align) {
        return undefined;
    }
    const map = {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline"
    };
    return map[align];
};
const twJustifyToClass = (justify)=>{
    if (!justify) {
        return undefined;
    }
    const map = {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly"
    };
    return map[justify];
};
const twRadiusToClass = (radius)=>{
    if (!radius) {
        return undefined;
    }
    const map = {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
        full: "rounded-full"
    };
    return map[radius];
};
const twBorderWidthToClass = (borderWidth)=>{
    if (!borderWidth) {
        return undefined;
    }
    const map = {
        "0": "border-0",
        "1": "border",
        "2": "border-2",
        "4": "border-4",
        "8": "border-8"
    };
    return map[borderWidth];
};
const twMaxWidthToClass = (maxWidth)=>{
    if (!maxWidth) {
        return undefined;
    }
    const map = {
        none: "max-w-none",
        xs: "max-w-xs",
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl",
        full: "max-w-full",
        prose: "max-w-prose"
    };
    return map[maxWidth];
};
const cx = (...classes)=>classes.filter(Boolean).join(" ");
const twColorToClass = (prefix, color)=>{
    if (!color) {
        return undefined;
    }
    return `${prefix}-${color}`;
};
// Tailwind needs to "see" class names statically to generate them.
// This list is intentionally unused at runtime; it exists for Tailwind's content scan.
const __twColorSafelist = [
    "bg-neutral-50",
    "bg-neutral-100",
    "bg-neutral-200",
    "bg-neutral-300",
    "bg-neutral-400",
    "bg-neutral-500",
    "bg-neutral-600",
    "bg-neutral-700",
    "bg-neutral-800",
    "bg-neutral-900",
    "bg-neutral-950",
    "border-neutral-50",
    "border-neutral-100",
    "border-neutral-200",
    "border-neutral-300",
    "border-neutral-400",
    "border-neutral-500",
    "border-neutral-600",
    "border-neutral-700",
    "border-neutral-800",
    "border-neutral-900",
    "border-neutral-950",
    "text-neutral-50",
    "text-neutral-100",
    "text-neutral-200",
    "text-neutral-300",
    "text-neutral-400",
    "text-neutral-500",
    "text-neutral-600",
    "text-neutral-700",
    "text-neutral-800",
    "text-neutral-900",
    "text-neutral-950",
    "bg-stone-50",
    "bg-stone-100",
    "bg-stone-200",
    "bg-stone-300",
    "bg-stone-400",
    "bg-stone-500",
    "bg-stone-600",
    "bg-stone-700",
    "bg-stone-800",
    "bg-stone-900",
    "bg-stone-950",
    "border-stone-50",
    "border-stone-100",
    "border-stone-200",
    "border-stone-300",
    "border-stone-400",
    "border-stone-500",
    "border-stone-600",
    "border-stone-700",
    "border-stone-800",
    "border-stone-900",
    "border-stone-950",
    "text-stone-50",
    "text-stone-100",
    "text-stone-200",
    "text-stone-300",
    "text-stone-400",
    "text-stone-500",
    "text-stone-600",
    "text-stone-700",
    "text-stone-800",
    "text-stone-900",
    "text-stone-950",
    "bg-slate-50",
    "bg-slate-100",
    "bg-slate-200",
    "bg-slate-300",
    "bg-slate-400",
    "bg-slate-500",
    "bg-slate-600",
    "bg-slate-700",
    "bg-slate-800",
    "bg-slate-900",
    "bg-slate-950",
    "border-slate-50",
    "border-slate-100",
    "border-slate-200",
    "border-slate-300",
    "border-slate-400",
    "border-slate-500",
    "border-slate-600",
    "border-slate-700",
    "border-slate-800",
    "border-slate-900",
    "border-slate-950",
    "text-slate-50",
    "text-slate-100",
    "text-slate-200",
    "text-slate-300",
    "text-slate-400",
    "text-slate-500",
    "text-slate-600",
    "text-slate-700",
    "text-slate-800",
    "text-slate-900",
    "text-slate-950",
    "bg-gray-50",
    "bg-gray-100",
    "bg-gray-200",
    "bg-gray-300",
    "bg-gray-400",
    "bg-gray-500",
    "bg-gray-600",
    "bg-gray-700",
    "bg-gray-800",
    "bg-gray-900",
    "bg-gray-950",
    "border-gray-50",
    "border-gray-100",
    "border-gray-200",
    "border-gray-300",
    "border-gray-400",
    "border-gray-500",
    "border-gray-600",
    "border-gray-700",
    "border-gray-800",
    "border-gray-900",
    "border-gray-950",
    "text-gray-50",
    "text-gray-100",
    "text-gray-200",
    "text-gray-300",
    "text-gray-400",
    "text-gray-500",
    "text-gray-600",
    "text-gray-700",
    "text-gray-800",
    "text-gray-900",
    "text-gray-950",
    "bg-sky-50",
    "bg-sky-100",
    "bg-sky-200",
    "bg-sky-300",
    "bg-sky-400",
    "bg-sky-500",
    "bg-sky-600",
    "bg-sky-700",
    "bg-sky-800",
    "bg-sky-900",
    "bg-sky-950",
    "border-sky-50",
    "border-sky-100",
    "border-sky-200",
    "border-sky-300",
    "border-sky-400",
    "border-sky-500",
    "border-sky-600",
    "border-sky-700",
    "border-sky-800",
    "border-sky-900",
    "border-sky-950",
    "text-sky-50",
    "text-sky-100",
    "text-sky-200",
    "text-sky-300",
    "text-sky-400",
    "text-sky-500",
    "text-sky-600",
    "text-sky-700",
    "text-sky-800",
    "text-sky-900",
    "text-sky-950"
];
void __twColorSafelist;
}),
"[project]/packages/ui/Cluster/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Cluster",
    ()=>Cluster
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/tw.ts [ssr] (ecmascript)");
;
;
const Cluster = ({ as, space, align, justify, className, style, children, ...props })=>{
    const Component = as ?? "div";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Component, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["cx"])("flex flex-wrap", (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["twSpacingToClass"])("gap", space), (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["twAlignToItemsClass"])(align), (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["twJustifyToClass"])(justify), className),
        style: style,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/ui/Cluster/index.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/packages/ui/ThemeToggle/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeToggle",
    ()=>ThemeToggle
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Cluster$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/Cluster/index.tsx [ssr] (ecmascript)");
;
;
;
const STORAGE_KEY = "theme";
const getPreferredTheme = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        return "light";
    }
    //TURBOPACK unreachable
    ;
    const stored = undefined;
};
const applyThemeToDocument = (theme)=>{
    document.documentElement.classList.toggle("dark", theme === "dark");
};
const ThemeToggle = ({ size = "sm" })=>{
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const preferred = getPreferredTheme();
        setTheme((current)=>{
            const next = current ?? preferred;
            return next;
        });
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (theme === null) {
            return;
        }
        applyThemeToDocument(theme);
        window.localStorage.setItem(STORAGE_KEY, theme);
    }, [
        theme
    ]);
    const effectiveTheme = theme ?? "light";
    const isDark = effectiveTheme === "dark";
    const currentLabel = isDark ? "ダーク" : "ライト";
    const nextLabel = isDark ? "ライト" : "ダーク";
    const sizeClassNames = size === "lg" ? {
        root: "h-8 w-16",
        thumb: "h-6 w-6",
        thumbOff: "translate-x-1",
        thumbOn: "translate-x-9"
    } : size === "md" ? {
        root: "h-7 w-14",
        thumb: "h-5 w-5",
        thumbOff: "translate-x-1",
        thumbOn: "translate-x-8"
    } : {
        root: "h-6 w-11",
        thumb: "h-4 w-4",
        thumbOff: "translate-x-1",
        thumbOn: "translate-x-6"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Cluster$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Cluster"], {
        space: "2",
        align: "center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                type: "button",
                role: "switch",
                "aria-checked": isDark,
                "aria-label": `テーマを${nextLabel}に切り替え`,
                onClick: ()=>setTheme(isDark ? "light" : "dark"),
                className: [
                    "relative inline-flex items-center rounded-full transition-colors",
                    "bg-neutral-200 dark:bg-neutral-700",
                    "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2",
                    "focus:ring-offset-white dark:focus:ring-offset-neutral-900",
                    sizeClassNames.root
                ].join(" "),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "sr-only",
                        children: "テーマ切り替え"
                    }, void 0, false, {
                        fileName: "[project]/packages/ui/ThemeToggle/index.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        "aria-hidden": true,
                        className: [
                            "inline-block transform rounded-full bg-white shadow transition-transform",
                            sizeClassNames.thumb,
                            isDark ? sizeClassNames.thumbOn : sizeClassNames.thumbOff
                        ].join(" ")
                    }, void 0, false, {
                        fileName: "[project]/packages/ui/ThemeToggle/index.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/packages/ui/ThemeToggle/index.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: [
                    "rounded px-2 py-1 text-xs font-medium",
                    isDark ? "bg-black text-neutral-300" : "bg-neutral-200 text-neutral-700"
                ].join(" "),
                children: currentLabel
            }, void 0, false, {
                fileName: "[project]/packages/ui/ThemeToggle/index.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/packages/ui/ThemeToggle/index.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/apps/site/components/feature/NavigationHeader/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NavigationHeader",
    ()=>NavigationHeader
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$NavigationHeader$2f$styles$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/apps/site/components/feature/NavigationHeader/styles.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$classnames__$5b$external$5d$__$28$classnames$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$classnames$29$__ = __turbopack_context__.i("[externals]/classnames [external] (classnames, cjs, [project]/node_modules/classnames)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$Avatar$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/site/components/feature/Avatar/index.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$ThemeToggle$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/ThemeToggle/index.tsx [ssr] (ecmascript)");
;
;
;
;
;
;
const NavigationHeader = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
            className: "w-full border-b-2 dark:border-b-stone-500",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$NavigationHeader$2f$styles$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navigationList,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(NavigationListItem, {
                        isPrimary: true,
                        prefetch: false,
                        href: "/",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$Avatar$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["GaaamiiAvatar"], {}, void 0, false, {
                                fileName: "[project]/apps/site/components/feature/NavigationHeader/index.tsx",
                                lineNumber: 13,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            "gaaamiiのブログ"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/site/components/feature/NavigationHeader/index.tsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(NavigationListItem, {
                        prefetch: false,
                        href: "/about",
                        children: "このブログについて"
                    }, void 0, false, {
                        fileName: "[project]/apps/site/components/feature/NavigationHeader/index.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                        className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$classnames__$5b$external$5d$__$28$classnames$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$classnames$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$NavigationHeader$2f$styles$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navigationListItem, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$NavigationHeader$2f$styles$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].utilityItem),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$ThemeToggle$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["ThemeToggle"], {}, void 0, false, {
                            fileName: "[project]/apps/site/components/feature/NavigationHeader/index.tsx",
                            lineNumber: 20,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/apps/site/components/feature/NavigationHeader/index.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/site/components/feature/NavigationHeader/index.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/apps/site/components/feature/NavigationHeader/index.tsx",
            lineNumber: 10,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/site/components/feature/NavigationHeader/index.tsx",
        lineNumber: 9,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const NavigationListItem = (props)=>{
    const { children, target, isPrimary, ...linkProps } = props;
    const anchorRelAttribute = target === "_blank" ? "noopener noreferrer" : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
        className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$classnames__$5b$external$5d$__$28$classnames$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$classnames$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$NavigationHeader$2f$styles$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navigationListItem, {
            [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$NavigationHeader$2f$styles$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]["navigationListItem--isPrimary"]]: !!isPrimary
        }),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
            ...linkProps,
            target: target,
            rel: anchorRelAttribute,
            children: children
        }, void 0, false, {
            fileName: "[project]/apps/site/components/feature/NavigationHeader/index.tsx",
            lineNumber: 42,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/site/components/feature/NavigationHeader/index.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/apps/site/components/feature/MainLayout/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$Main$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/site/components/feature/Main/index.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$Footer$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/site/components/feature/Footer/index.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$RSS$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/icons/RSS.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$InformationCircle$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/icons/InformationCircle.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$ArrowUp$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/icons/ArrowUp.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$NavigationHeader$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/site/components/feature/NavigationHeader/index.tsx [ssr] (ecmascript)");
;
;
;
;
;
;
;
;
const MainLayout = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "gaaamiiのブログ"
                    }, void 0, false, {
                        fileName: "[project]/apps/site/components/feature/MainLayout/index.tsx",
                        lineNumber: 12,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "間違ったことを書いている時があります。コメントやTwitter、ブコメなどでご指摘ください"
                    }, void 0, false, {
                        fileName: "[project]/apps/site/components/feature/MainLayout/index.tsx",
                        lineNumber: 13,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/site/components/feature/MainLayout/index.tsx",
                lineNumber: 11,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$NavigationHeader$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["NavigationHeader"], {}, void 0, false, {
                fileName: "[project]/apps/site/components/feature/MainLayout/index.tsx",
                lineNumber: 19,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$Main$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/site/components/feature/MainLayout/index.tsx",
                lineNumber: 20,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$Footer$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$Footer$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["FooterLink"], {
                        href: "/about",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$InformationCircle$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["InformationCircleIcon"], {}, void 0, false, {
                                fileName: "[project]/apps/site/components/feature/MainLayout/index.tsx",
                                lineNumber: 23,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                children: "このブログについて"
                            }, void 0, false, {
                                fileName: "[project]/apps/site/components/feature/MainLayout/index.tsx",
                                lineNumber: 24,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/site/components/feature/MainLayout/index.tsx",
                        lineNumber: 22,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$Footer$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["FooterLink"], {
                        href: "/feed",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$RSS$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["RSSIcon"], {}, void 0, false, {
                                fileName: "[project]/apps/site/components/feature/MainLayout/index.tsx",
                                lineNumber: 27,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                children: "RSS"
                            }, void 0, false, {
                                fileName: "[project]/apps/site/components/feature/MainLayout/index.tsx",
                                lineNumber: 28,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/site/components/feature/MainLayout/index.tsx",
                        lineNumber: 26,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$Footer$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["FooterLink"], {
                        href: "/",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$ArrowUp$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["ArrowUpIcon"], {}, void 0, false, {
                                fileName: "[project]/apps/site/components/feature/MainLayout/index.tsx",
                                lineNumber: 31,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                children: "トップに戻る"
                            }, void 0, false, {
                                fileName: "[project]/apps/site/components/feature/MainLayout/index.tsx",
                                lineNumber: 32,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/site/components/feature/MainLayout/index.tsx",
                        lineNumber: 30,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/site/components/feature/MainLayout/index.tsx",
                lineNumber: 21,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
const __TURBOPACK__default__export__ = MainLayout;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[project]/packages/utils/datetime.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getFullTimeString",
    ()=>getFullTimeString,
    "getISODateString",
    ()=>getISODateString,
    "getLocalizedDateString",
    ()=>getLocalizedDateString,
    "getTimeString",
    ()=>getTimeString
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$luxon__$5b$external$5d$__$28$luxon$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$luxon$29$__ = __turbopack_context__.i("[externals]/luxon [external] (luxon, esm_import, [project]/node_modules/luxon)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$luxon__$5b$external$5d$__$28$luxon$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$luxon$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$luxon__$5b$external$5d$__$28$luxon$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$luxon$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const getISODateString = (date)=>{
    const datetime = typeof date === "object" ? __TURBOPACK__imported__module__$5b$externals$5d2f$luxon__$5b$external$5d$__$28$luxon$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$luxon$29$__["DateTime"].fromJSDate(date) : __TURBOPACK__imported__module__$5b$externals$5d2f$luxon__$5b$external$5d$__$28$luxon$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$luxon$29$__["DateTime"].fromISO(date);
    return datetime.toISODate();
};
const getLocalizedDateString = (date)=>{
    const datetime = typeof date === "object" ? __TURBOPACK__imported__module__$5b$externals$5d2f$luxon__$5b$external$5d$__$28$luxon$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$luxon$29$__["DateTime"].fromJSDate(date) : __TURBOPACK__imported__module__$5b$externals$5d2f$luxon__$5b$external$5d$__$28$luxon$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$luxon$29$__["DateTime"].fromISO(date);
    return datetime.setLocale("ja").toFormat("DD");
};
const getTimeString = (date)=>{
    const format = "HH:mm";
    return formatTimeString(date, format);
};
const getFullTimeString = (date)=>{
    const format = "HH:mm:ss";
    return formatTimeString(date, format);
};
const formatTimeString = (date, format)=>{
    const datetime = typeof date === "object" ? __TURBOPACK__imported__module__$5b$externals$5d2f$luxon__$5b$external$5d$__$28$luxon$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$luxon$29$__["DateTime"].fromJSDate(date) : __TURBOPACK__imported__module__$5b$externals$5d2f$luxon__$5b$external$5d$__$28$luxon$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$luxon$29$__["DateTime"].fromISO(date);
    return datetime.setLocale("ja").toFormat(format);
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/site/pages/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Home,
    "getStaticProps",
    ()=>getStaticProps
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$PostLink$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/site/components/feature/PostLink/index.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$lib$2f$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/site/lib/api.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$MainLayout$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/site/components/feature/MainLayout/index.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$utils$2f$datetime$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/utils/datetime.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$utils$2f$datetime$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$utils$2f$datetime$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
function Home(props) {
    const { query, onChangeQuery, onEnterQuery } = useHome();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$MainLayout$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Search, {
                query: query,
                onChange: onChangeQuery,
                onEnter: onEnterQuery
            }, void 0, false, {
                fileName: "[project]/apps/site/pages/index.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Posts, {
                posts: props.posts,
                query: query
            }, void 0, false, {
                fileName: "[project]/apps/site/pages/index.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/site/pages/index.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
const useHome = ()=>{
    const searchParamsQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])().get("query");
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(searchParamsQuery);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        setQuery(searchParamsQuery);
    }, [
        searchParamsQuery
    ]);
    const onChangeQuery = (text)=>{
        setQuery(text);
    };
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const onEnterQuery = (e)=>{
        e.preventDefault();
        const nextQuery = query ? {
            query
        } : {};
        router.push({
            query: nextQuery
        });
        e.target.childNodes[0].blur();
    };
    return {
        query,
        onChangeQuery,
        onEnterQuery
    };
};
const getSearchPlaceholder = ()=>{
    const samples = [
        "Elm",
        "Next.js",
        "AtCoder",
        "Rails",
        "CSS"
    ];
    const currentMinute = new Date().getMinutes();
    return samples[currentMinute % samples.length];
};
const Search = ({ onChange, onEnter, query })=>{
    const placeholder = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(getSearchPlaceholder, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
        role: "search",
        onSubmit: onEnter,
        className: "w-full mt-4 px-2 sm:mt-0 sm:px-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                htmlFor: "search-input",
                className: "text-sm",
                children: "記事を検索する"
            }, void 0, false, {
                fileName: "[project]/apps/site/pages/index.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                id: "search-input",
                type: "search",
                placeholder: placeholder,
                "aria-label": "記事を検索",
                className: "mt-2 bg-white dark:focus:bg-neutral-800 dark:bg-neutral-800 dark:text-white dark:placeholder:text-stone-400 px-4 py-2 rounded w-full border-2 dark:border-stone-400 focus:border-transparent",
                onChange: (e)=>{
                    e.preventDefault();
                    onChange(e.target.value);
                },
                enterKeyHint: "search",
                defaultValue: query
            }, void 0, false, {
                fileName: "[project]/apps/site/pages/index.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/site/pages/index.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const matchQuery = (post, query)=>post.title.toLowerCase().indexOf(query.toLocaleLowerCase()) >= 0;
const Posts = ({ posts, query })=>{
    if (!posts) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            children: "読み込み中..."
        }, void 0, false, {
            fileName: "[project]/apps/site/pages/index.tsx",
            lineNumber: 103,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        className: "py-4 xs:p-0 xs:mt-4",
        children: posts.filter((post)=>query ? matchQuery(post, query) : post).map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(PostItem, {
                post: post
            }, post.id, false, {
                fileName: "[project]/apps/site/pages/index.tsx",
                lineNumber: 111,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/apps/site/pages/index.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const PostItem = ({ post })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "mt-4 relative lg:flex lg:items-center lg:gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("time", {
                className: "block ml-4 lg:ml-0 sm:min-w-32 sm:inline-block",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$utils$2f$datetime$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getLocalizedDateString"])(post.published_at)
            }, void 0, false, {
                fileName: "[project]/apps/site/pages/index.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grow",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$components$2f$feature$2f$PostLink$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["PostLink"], {
                    post: post,
                    href: `/posts/${post.id}`
                }, void 0, false, {
                    fileName: "[project]/apps/site/pages/index.tsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/apps/site/pages/index.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/site/pages/index.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
async function getStaticProps(context) {
    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$site$2f$lib$2f$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["get"])(`/posts`);
    const posts = res.ok ? await res.json() : [];
    return {
        props: {
            posts
        }
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f22430ec._.js.map