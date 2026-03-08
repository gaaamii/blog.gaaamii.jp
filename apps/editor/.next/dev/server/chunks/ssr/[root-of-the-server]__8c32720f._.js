module.exports = [
"[project]/apps/editor/lib/editor-api.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "get",
    ()=>get
]);
const API_BASE_URL = "/api/mock";
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
    return fetch(`${API_BASE_URL}${path}`, init);
}
}),
"[project]/apps/editor/hooks/useAuthorization.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthorization",
    ()=>useAuthorization
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$lib$2f$editor$2d$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/lib/editor-api.ts [ssr] (ecmascript)");
;
;
const useAuthorization = ()=>{
    const [isAuthorized, setIsAuthorized] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const fetchUserSession = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$lib$2f$editor$2d$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["get"])("/user_sessions/ping").then((res)=>{
            if (res.ok) {
                setIsAuthorized(true);
            }
        });
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(fetchUserSession, []);
    return {
        isAuthorized
    };
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
"[project]/apps/editor/lib/content-api.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "destroy",
    ()=>destroy,
    "get",
    ()=>get,
    "post",
    ()=>post,
    "put",
    ()=>put
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$utils$2f$environment$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/utils/environment.ts [ssr] (ecmascript)");
;
const PROD_API_BASE_URL = process.env.NEXT_PUBLIC_SITE_API_BASE_URL || "https://api.gaaamii.jp";
const DEV_API_BASE_URL = process.env.NEXT_PUBLIC_SITE_API_BASE_URL || "http://localhost:3000/api/mock";
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
async function post(path, body) {
    return request(path, {
        ...requestInitBase,
        method: "POST",
        body: JSON.stringify(body)
    });
}
async function put(path, body) {
    return request(path, {
        ...requestInitBase,
        method: "PUT",
        body: JSON.stringify(body)
    });
}
async function destroy(path) {
    return request(path, {
        ...requestInitBase,
        method: "DELETE"
    });
}
async function request(path, init) {
    return fetch(`${getAPIBaseURL()}${path}`, init);
}
}),
"[project]/apps/editor/hooks/useFetchPostsAsAdmin.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFetchPostsAsAdmin",
    ()=>useFetchPostsAsAdmin
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$lib$2f$content$2d$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/lib/content-api.ts [ssr] (ecmascript)");
;
;
const useFetchPostsAsAdmin = (postStatus)=>{
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        setPosts(null);
        setIsLoading(true);
        setError(null);
    }, [
        postStatus
    ]);
    const fetchPosts = async ()=>{
        const basePath = "/admin/posts";
        const path = postStatus ? `${basePath}?status=${postStatus}` : basePath;
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$lib$2f$content$2d$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["get"])(path);
            if (response.ok) {
                const json = await response.json();
                setPosts(json);
            } else {
                alert("エラーです");
            }
        } catch (nextError) {
            setError(nextError);
        } finally{
            setIsLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        fetchPosts();
    }, [
        postStatus
    ]);
    return {
        posts,
        isLoading,
        error,
        refetch: fetchPosts
    };
};
}),
"[project]/apps/editor/components/feature/PostLink/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
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
            fileName: "[project]/apps/editor/components/feature/PostLink/index.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/editor/components/feature/PostLink/index.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/apps/editor/components/feature/Main/styles.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "root": "styles-module__7aonoG__root",
});
}),
"[project]/apps/editor/components/feature/Main/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$Main$2f$styles$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/apps/editor/components/feature/Main/styles.module.css [ssr] (css module)");
;
;
const Main = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$Main$2f$styles$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].root} mx-auto sm:my-8`,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/editor/components/feature/Main/index.tsx",
        lineNumber: 4,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const __TURBOPACK__default__export__ = Main;
}),
"[project]/packages/ui/Button/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
;
;
const Button = ({ theme = "primary", size = "lg", children, as, ...attributes })=>{
    const classNames = getClassNames({
        theme,
        size
    });
    switch(as){
        case "Link":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                ...attributes,
                className: classNames,
                children: children
            }, void 0, false, {
                fileName: "[project]/packages/ui/Button/index.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0));
        case "a":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                ...attributes,
                className: classNames,
                children: children
            }, void 0, false, {
                fileName: "[project]/packages/ui/Button/index.tsx",
                lineNumber: 38,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0));
        case "button":
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                ...attributes,
                className: classNames,
                children: children
            }, void 0, false, {
                fileName: "[project]/packages/ui/Button/index.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0));
    }
};
const getThemeClassNames = (theme)=>{
    const primaryClassNames = [
        "bg-sky-600",
        "text-white",
        "hover:bg-sky-800",
        "disabled:bg-sky-300",
        "disabled:text-white",
        "disabled:cursor-not-allowed",
        "font-bold"
    ];
    const secondaryClassNames = [
        "font-bold",
        "disabled:cursor-not-allowed",
        // light theme
        "bg-neutral-200",
        "text-black",
        "hover:bg-neutral-300",
        "disabled:bg-neutral-400",
        "disabled:text-white",
        // dark theme
        "dark:bg-stone-700",
        "dark:text-stone-200",
        "dark:hover:text-white",
        "dark:focus:text-white",
        "dark:hover:bg-stone-600"
    ];
    const outlineClassNames = [
        "border-2",
        // light
        "border-gray-200",
        "hover:bg-neutral-200",
        "hover:border-neutral-400",
        // dark
        "dark:border-stone-400",
        "dark:hover:bg-stone-700",
        "dark:hover:border-stone-200",
        "dark:hover:text-white"
    ];
    const textClassNames = [
        "underline",
        "cursor-pointer",
        "inline-block"
    ];
    const themeClassNames = {
        primary: primaryClassNames,
        secondary: secondaryClassNames,
        text: textClassNames,
        outline: outlineClassNames
    };
    return themeClassNames[theme];
};
const getSizeClassNames = (size, theme)=>{
    if (theme === "text") {
        return [];
    }
    switch(size){
        case "lg":
            return [
                "px-12",
                "py-3",
                "rounded-md"
            ];
        case "md":
            return [
                "px-10",
                "py-3",
                "rounded-md",
                "text-md"
            ];
        case "sm":
            return [
                "px-8",
                "py-2",
                "rounded-md",
                "text-sm"
            ];
        default:
            return [
                "px-12",
                "py-3",
                "rounded-md",
                "text-md"
            ];
    }
};
const getClassNames = ({ theme, size })=>{
    const baseClassNames = [
        "cursor-pointer",
        "transition-colors",
        "inline-block"
    ];
    const themeClassNames = getThemeClassNames(theme);
    const sizeClassNames = getSizeClassNames(size, theme);
    return [
        ...baseClassNames,
        ...themeClassNames,
        ...sizeClassNames
    ].join(" ");
};
}),
"[project]/packages/ui/icons/IconClosed.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This component uses Heroicons svg.
// Heroicons is licensed under the MIT License
// https://github.com/tailwindlabs/heroicons/blob/master/LICENSE
__turbopack_context__.s([
    "IconClosedIcon",
    ()=>IconClosedIcon
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
const IconClosedIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "size-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
        }, void 0, false, {
            fileName: "[project]/packages/ui/icons/IconClosed.tsx",
            lineNumber: 13,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/packages/ui/icons/IconClosed.tsx",
        lineNumber: 5,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
}),
"[project]/packages/ui/icons/PencilSquare.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This component uses Heroicons svg.
// Heroicons is licensed under the MIT License
// https://github.com/tailwindlabs/heroicons/blob/master/LICENSE
__turbopack_context__.s([
    "PencilSquareIcon",
    ()=>PencilSquareIcon
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
const PencilSquareIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "size-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        }, void 0, false, {
            fileName: "[project]/packages/ui/icons/PencilSquare.tsx",
            lineNumber: 13,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/packages/ui/icons/PencilSquare.tsx",
        lineNumber: 5,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
}),
"[project]/packages/ui/icons/CodeBracket.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This component uses Heroicons svg.
// Heroicons is licensed under the MIT License
// https://github.com/tailwindlabs/heroicons/blob/master/LICENSE
__turbopack_context__.s([
    "CodeBracketIcon",
    ()=>CodeBracketIcon
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
const CodeBracketIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "size-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
        }, void 0, false, {
            fileName: "[project]/packages/ui/icons/CodeBracket.tsx",
            lineNumber: 13,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/packages/ui/icons/CodeBracket.tsx",
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
"[project]/apps/editor/components/feature/AdminLayout/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminLayout",
    ()=>AdminLayout
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$Main$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/components/feature/Main/index.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Button$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/Button/index.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$IconClosed$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/icons/IconClosed.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$PencilSquare$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/icons/PencilSquare.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$CodeBracket$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/icons/CodeBracket.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$ThemeToggle$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/ThemeToggle/index.tsx [ssr] (ecmascript)");
;
;
;
;
;
;
;
;
const AdminLayout = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "gaaamiiのブログ"
                    }, void 0, false, {
                        fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                        lineNumber: 12,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "間違ったことを書いている時があります。コメントやTwitter、ブコメなどでご指摘ください"
                    }, void 0, false, {
                        fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                        lineNumber: 13,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                lineNumber: 11,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(AdminHeader, {}, void 0, false, {
                fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                lineNumber: 19,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$Main$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                lineNumber: 20,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
const AdminHeader = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
        className: "w-full py-4 px-8 border-b",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
            className: "w-2/3 m-auto flex items-center justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    className: "flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$IconClosed$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["IconClosedIcon"], {}, void 0, false, {
                            fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        " blog-editor.gaaamii.jp の管理画面"
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                    className: "flex justify-end gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(AdminHeaderNavItem, {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$ThemeToggle$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["ThemeToggle"], {}, void 0, false, {
                                fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                                lineNumber: 33,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(AdminHeaderNavItem, {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Button$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                theme: "secondary",
                                href: "https://github.com/gaaamii/blog.gaaamii.jp",
                                as: "Link",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$CodeBracket$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["CodeBracketIcon"], {}, void 0, false, {
                                            fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                                            lineNumber: 43,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            children: "コード直す"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                                            lineNumber: 44,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                                    lineNumber: 42,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(AdminHeaderNavItem, {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Button$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                as: "Link",
                                size: "sm",
                                theme: "primary",
                                href: "/posts/new",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$PencilSquare$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["PencilSquareIcon"], {}, void 0, false, {
                                            fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                                            lineNumber: 51,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            children: "なにか書く！"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                                            lineNumber: 52,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                                    lineNumber: 50,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const AdminHeaderNavItem = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
        className: "list-none",
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
        lineNumber: 63,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
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
"[project]/apps/editor/pages/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Admin
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$hooks$2f$useAuthorization$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/hooks/useAuthorization.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$hooks$2f$useFetchPostsAsAdmin$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/hooks/useFetchPostsAsAdmin.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$PostLink$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/components/feature/PostLink/index.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$AdminLayout$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/components/feature/AdminLayout/index.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$utils$2f$datetime$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/utils/datetime.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Button$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/Button/index.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$lib$2f$content$2d$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/lib/content-api.ts [ssr] (ecmascript)");
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
;
;
function Admin() {
    const { isAuthorized } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$hooks$2f$useAuthorization$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["useAuthorization"])();
    return isAuthorized ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$AdminLayout$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["AdminLayout"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(PostSection, {}, void 0, false, {
            fileName: "[project]/apps/editor/pages/index.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/editor/pages/index.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this) : null;
}
const PostSection = ()=>{
    const { postStatus, onChangeStatus } = usePostSelect();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        className: "mt-8 border p-8 rounded-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                className: "text-lg font-bold",
                children: "記事一覧"
            }, void 0, false, {
                fileName: "[project]/apps/editor/pages/index.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex gap-4 mt-4 items-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(PostFilter, {
                    value: postStatus,
                    onChange: onChangeStatus
                }, void 0, false, {
                    fileName: "[project]/apps/editor/pages/index.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/apps/editor/pages/index.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mt-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(PostList, {
                    postStatus: postStatus
                }, void 0, false, {
                    fileName: "[project]/apps/editor/pages/index.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/apps/editor/pages/index.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/editor/pages/index.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const usePostSelect = ()=>{
    const [postStatus, setPostStatus] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("draft");
    const onChangeStatus = (e)=>{
        if (e.target.value === "published" || e.target.value === "draft") {
            setPostStatus(e.target.value);
        } else {
            setPostStatus(null);
        }
    };
    return {
        postStatus,
        onChangeStatus
    };
};
const PostFilter = ({ onChange, value })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                htmlFor: "post-select",
                children: "公開状態"
            }, void 0, false, {
                fileName: "[project]/apps/editor/pages/index.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(PostSelect, {
                onChange: onChange,
                value: value
            }, void 0, false, {
                fileName: "[project]/apps/editor/pages/index.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
const PostSelect = ({ onChange, value })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
        id: "post-select",
        className: "border border-slate-500 h-8 w-40 rounded",
        onChange: onChange,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                selected: value === null,
                value: "all",
                children: "すべて"
            }, void 0, false, {
                fileName: "[project]/apps/editor/pages/index.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                selected: value === "draft",
                value: "draft",
                children: "下書き"
            }, void 0, false, {
                fileName: "[project]/apps/editor/pages/index.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                selected: value === "published",
                value: "published",
                children: "公開済み"
            }, void 0, false, {
                fileName: "[project]/apps/editor/pages/index.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/editor/pages/index.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const PostList = ({ postStatus })=>{
    const { isLoading, posts, error, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$hooks$2f$useFetchPostsAsAdmin$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["useFetchPostsAsAdmin"])(postStatus);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
            className: "text-center bg-neutral-200 py-2",
            children: "読込中..."
        }, void 0, false, {
            fileName: "[project]/apps/editor/pages/index.tsx",
            lineNumber: 98,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
            className: "text-center bg-red-100 py-2 text-red-700",
            children: "記事一覧の取得に失敗しました。`site` 側も起動してください。"
        }, void 0, false, {
            fileName: "[project]/apps/editor/pages/index.tsx",
            lineNumber: 103,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return posts && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        children: posts.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(PostItem, {
                post: post,
                onDelete: refetch
            }, post.id, false, {
                fileName: "[project]/apps/editor/pages/index.tsx",
                lineNumber: 113,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/apps/editor/pages/index.tsx",
        lineNumber: 111,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
};
const usePostItem = ({ post, onDelete })=>{
    const [isDeleting, setIsDeleting] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState(false);
    const deletePost = async ()=>{
        setIsDeleting(true);
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$lib$2f$content$2d$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["destroy"])(`/posts/${post.id}`);
        if (response.ok) {
            alert("削除しました");
            setIsDeleting(false);
            onDelete();
        } else {
            alert("エラーが発生しました");
            setIsDeleting(false);
        }
    };
    return {
        deletePost,
        isDeleting
    };
};
const PostItem = ({ post, onDelete })=>{
    const { isDeleting, deletePost } = usePostItem({
        post,
        onDelete
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "mt-0 sm:mt-4 relative list-none lg:flex items-center gap-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("time", {
                className: "inline-block text-sm",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$utils$2f$datetime$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getLocalizedDateString"])(post.published_at)
            }, void 0, false, {
                fileName: "[project]/apps/editor/pages/index.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$PostLink$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["PostLink"], {
                post: post,
                href: `/posts/${post.id}`
            }, void 0, false, {
                fileName: "[project]/apps/editor/pages/index.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: `/posts/${post.id}/edit`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "underline cursor-pointer",
                            children: "編集する"
                        }, void 0, false, {
                            fileName: "[project]/apps/editor/pages/index.tsx",
                            lineNumber: 155,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/apps/editor/pages/index.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Button$2f$index$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: deletePost,
                        disabled: isDeleting,
                        theme: "text",
                        children: "削除する"
                    }, void 0, false, {
                        fileName: "[project]/apps/editor/pages/index.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/editor/pages/index.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/editor/pages/index.tsx",
        lineNumber: 148,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8c32720f._.js.map