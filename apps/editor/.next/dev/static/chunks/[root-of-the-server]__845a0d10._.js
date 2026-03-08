(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/packages/utils/environment.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isDevelopment",
    ()=>isDevelopment,
    "isProduction",
    ()=>isProduction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
function isProduction() {
    return ("TURBOPACK compile-time value", "development") === "production";
}
function isDevelopment() {
    return ("TURBOPACK compile-time value", "development") === "development";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/editor/lib/content-api.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$utils$2f$environment$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/utils/environment.ts [client] (ecmascript)");
;
const PROD_API_BASE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SITE_API_BASE_URL || "https://api.gaaamii.jp";
const DEV_API_BASE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SITE_API_BASE_URL || "http://localhost:3000/api/mock";
function getAPIBaseURL() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$utils$2f$environment$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["isDevelopment"])() ? DEV_API_BASE_URL : PROD_API_BASE_URL;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/Button/index.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
;
;
const Button = ({ theme = "primary", size = "lg", children, as, ...attributes })=>{
    const classNames = getClassNames({
        theme,
        size
    });
    switch(as){
        case "Link":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                ...attributes,
                className: classNames,
                children: children
            }, void 0, false, {
                fileName: "[project]/packages/ui/Button/index.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0));
        case "a":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
_c = Button;
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
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/tw.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/Cluster/index.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Cluster",
    ()=>Cluster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/tw.ts [client] (ecmascript)");
;
;
const Cluster = ({ as, space, align, justify, className, style, children, ...props })=>{
    const Component = as ?? "div";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cx"])("flex flex-wrap", (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["twSpacingToClass"])("gap", space), (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["twAlignToItemsClass"])(align), (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["twJustifyToClass"])(justify), className),
        style: style,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/ui/Cluster/index.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Cluster;
var _c;
__turbopack_context__.k.register(_c, "Cluster");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/Stack/index.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Stack",
    ()=>Stack
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/tw.ts [client] (ecmascript)");
;
;
const Stack = ({ as, space, align, justify, className, style, children, ...props })=>{
    const Component = as ?? "div";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cx"])("flex flex-col", (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["twSpacingToClass"])("gap", space), (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["twAlignToItemsClass"])(align), (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["twJustifyToClass"])(justify), className),
        style: style,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/ui/Stack/index.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Stack;
var _c;
__turbopack_context__.k.register(_c, "Stack");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/utils/datetime.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$luxon$2f$src$2f$luxon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/luxon/src/luxon.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$luxon$2f$src$2f$datetime$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DateTime$3e$__ = __turbopack_context__.i("[project]/node_modules/luxon/src/datetime.js [client] (ecmascript) <export default as DateTime>");
;
const getISODateString = (date)=>{
    const datetime = typeof date === "object" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$luxon$2f$src$2f$datetime$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DateTime$3e$__["DateTime"].fromJSDate(date) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$luxon$2f$src$2f$datetime$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DateTime$3e$__["DateTime"].fromISO(date);
    return datetime.toISODate();
};
const getLocalizedDateString = (date)=>{
    const datetime = typeof date === "object" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$luxon$2f$src$2f$datetime$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DateTime$3e$__["DateTime"].fromJSDate(date) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$luxon$2f$src$2f$datetime$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DateTime$3e$__["DateTime"].fromISO(date);
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
    const datetime = typeof date === "object" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$luxon$2f$src$2f$datetime$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DateTime$3e$__["DateTime"].fromJSDate(date) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$luxon$2f$src$2f$datetime$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DateTime$3e$__["DateTime"].fromISO(date);
    return datetime.setLocale("ja").toFormat(format);
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/icons/CheckCircle.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This component uses Heroicons svg.
// Heroicons is licensed under the MIT License
// https://github.com/tailwindlabs/heroicons/blob/master/LICENSE
__turbopack_context__.s([
    "CheckCircleIcon",
    ()=>CheckCircleIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
const CheckCircleIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "size-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        }, void 0, false, {
            fileName: "[project]/packages/ui/icons/CheckCircle.tsx",
            lineNumber: 13,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/packages/ui/icons/CheckCircle.tsx",
        lineNumber: 5,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = CheckCircleIcon;
var _c;
__turbopack_context__.k.register(_c, "CheckCircleIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/editor/components/feature/Form/PostStatus.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostStatus",
    ()=>PostStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$CheckCircle$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/icons/CheckCircle.tsx [client] (ecmascript)");
;
;
const PostStatus = ({ status })=>{
    return status === "draft" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DraftStatus, {}, void 0, false, {
        fileName: "[project]/apps/editor/components/feature/Form/PostStatus.tsx",
        lineNumber: 5,
        columnNumber: 31
    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PublishedStatus, {}, void 0, false, {
        fileName: "[project]/apps/editor/components/feature/Form/PostStatus.tsx",
        lineNumber: 5,
        columnNumber: 49
    }, ("TURBOPACK compile-time value", void 0));
};
_c = PostStatus;
const DraftStatus = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBox, {
        className: "border-slate-500",
        children: "下書き"
    }, void 0, false, {
        fileName: "[project]/apps/editor/components/feature/Form/PostStatus.tsx",
        lineNumber: 9,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = DraftStatus;
const PublishedStatus = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBox, {
        className: "border-green-700 text-green-700",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 ml-[-8]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$CheckCircle$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["CheckCircleIcon"], {}, void 0, false, {
                    fileName: "[project]/apps/editor/components/feature/Form/PostStatus.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                "公開済み"
            ]
        }, void 0, true, {
            fileName: "[project]/apps/editor/components/feature/Form/PostStatus.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/editor/components/feature/Form/PostStatus.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c2 = PublishedStatus;
const StatusBox = ({ children, className })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `font-bold appearance-none border px-6 pt-1 pb-1 text-sm rounded-md ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/editor/components/feature/Form/PostStatus.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c3 = StatusBox;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "PostStatus");
__turbopack_context__.k.register(_c1, "DraftStatus");
__turbopack_context__.k.register(_c2, "PublishedStatus");
__turbopack_context__.k.register(_c3, "StatusBox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/editor/components/feature/Form/Input.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
const Input = (props)=>{
    const { className, ...rest } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        ...rest,
        className: [
            "p-2 border rounded-sm",
            className
        ].filter(Boolean).join(" ")
    }, void 0, false, {
        fileName: "[project]/apps/editor/components/feature/Form/Input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Input;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/editor/components/feature/Form/Textarea.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Textarea",
    ()=>Textarea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
const Textarea = (props)=>{
    const { className, ...rest } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        ...rest,
        className: [
            "p-2 border rounded-sm",
            className
        ].filter(Boolean).join(" ")
    }, void 0, false, {
        fileName: "[project]/apps/editor/components/feature/Form/Textarea.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Textarea;
var _c;
__turbopack_context__.k.register(_c, "Textarea");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/editor/lib/editor-api.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/editor/lib/cloudinary.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "postImageToCloudinary",
    ()=>postImageToCloudinary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$lib$2f$editor$2d$api$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/lib/editor-api.ts [client] (ecmascript)");
;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`;
const postImageToCloudinary = async (file)=>{
    const signDataResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$lib$2f$editor$2d$api$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["get"])("/cloudinary_signature");
    const signData = await signDataResponse.json();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("signature", signData.signature);
    formData.append("api_key", signData.api_key);
    formData.append("timestamp", signData.timestamp);
    return fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData
    });
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/icons/Photo.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This component uses Heroicons svg.
// Heroicons is licensed under the MIT License
// https://github.com/tailwindlabs/heroicons/blob/master/LICENSE
__turbopack_context__.s([
    "PhotoIcon",
    ()=>PhotoIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
const PhotoIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "size-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        }, void 0, false, {
            fileName: "[project]/packages/ui/icons/Photo.tsx",
            lineNumber: 13,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/packages/ui/icons/Photo.tsx",
        lineNumber: 5,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = PhotoIcon;
var _c;
__turbopack_context__.k.register(_c, "PhotoIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/icons/ArrowUpTray.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This component uses Heroicons svg.
// Heroicons is licensed under the MIT License
// https://github.com/tailwindlabs/heroicons/blob/master/LICENSE
__turbopack_context__.s([
    "ArrowUpTrayIcon",
    ()=>ArrowUpTrayIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
const ArrowUpTrayIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "size-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
        }, void 0, false, {
            fileName: "[project]/packages/ui/icons/ArrowUpTray.tsx",
            lineNumber: 13,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/packages/ui/icons/ArrowUpTray.tsx",
        lineNumber: 5,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = ArrowUpTrayIcon;
var _c;
__turbopack_context__.k.register(_c, "ArrowUpTrayIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/editor/components/feature/Form/ImageForm.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImageForm",
    ()=>ImageForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Button$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/Button/index.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$lib$2f$cloudinary$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/lib/cloudinary.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$Photo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/icons/Photo.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$ArrowUpTray$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/icons/ArrowUpTray.tsx [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
;
;
const ImageForm = ()=>{
    _s();
    const { isUploading, url, file, onUpload, onSelectFile } = useFileUploader();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-sm border",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                    className: "p-2 hover:bg-slate-200 flex gap-2 items-center cursor-pointer text-gray-800 dark:text-gray-400 text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$Photo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["PhotoIcon"], {}, void 0, false, {
                            fileName: "[project]/apps/editor/components/feature/Form/ImageForm.tsx",
                            lineNumber: 17,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-bold",
                            children: "画像アップロード"
                        }, void 0, false, {
                            fileName: "[project]/apps/editor/components/feature/Form/ImageForm.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/editor/components/feature/Form/ImageForm.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                className: "border w-full",
                                onChange: onSelectFile
                            }, void 0, false, {
                                fileName: "[project]/apps/editor/components/feature/Form/ImageForm.tsx",
                                lineNumber: 22,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/apps/editor/components/feature/Form/ImageForm.tsx",
                            lineNumber: 21,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-end mt-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Button$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                onClick: onUpload,
                                disabled: isUploading || !file,
                                size: "sm",
                                theme: "secondary",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$ArrowUpTray$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["ArrowUpTrayIcon"], {}, void 0, false, {
                                            fileName: "[project]/apps/editor/components/feature/Form/ImageForm.tsx",
                                            lineNumber: 37,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "アップロードする"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/editor/components/feature/Form/ImageForm.tsx",
                                            lineNumber: 38,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/editor/components/feature/Form/ImageForm.tsx",
                                    lineNumber: 36,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/apps/editor/components/feature/Form/ImageForm.tsx",
                                lineNumber: 29,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/apps/editor/components/feature/Form/ImageForm.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2",
                            children: [
                                url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 p-2 border flex justify-center bg-neutral-100",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: url,
                                        className: "border-l border-r"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/editor/components/feature/Form/ImageForm.tsx",
                                        lineNumber: 45,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/apps/editor/components/feature/Form/ImageForm.tsx",
                                    lineNumber: 44,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-right",
                                    children: [
                                        "画像URL: ",
                                        url
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/editor/components/feature/Form/ImageForm.tsx",
                                    lineNumber: 48,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/editor/components/feature/Form/ImageForm.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/editor/components/feature/Form/ImageForm.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/apps/editor/components/feature/Form/ImageForm.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/editor/components/feature/Form/ImageForm.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ImageForm, "3NatDZDd1WitalQjCWx75M1CTGo=", false, function() {
    return [
        useFileUploader
    ];
});
_c = ImageForm;
const useFileUploader = ()=>{
    _s1();
    const [isUploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [url, setUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const onUpload = async ()=>{
        if (!file) {
            alert("ファイルを指定してください");
            return;
        }
        setUploading(true);
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$lib$2f$cloudinary$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["postImageToCloudinary"])(file);
        setUploading(false);
        if (response.ok) {
            const json = await response.json();
            setUrl(json.secure_url);
        }
    };
    const onSelectFile = (e)=>{
        setFile(e.target.files[0]);
    };
    return {
        file,
        onUpload,
        onSelectFile,
        isUploading,
        url
    };
};
_s1(useFileUploader, "OoSwQOma7ysiaI8rN8JsWlIw+n8=");
var _c;
__turbopack_context__.k.register(_c, "ImageForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/Center/index.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Center",
    ()=>Center
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/tw.ts [client] (ecmascript)");
;
;
const Center = ({ as, maxWidth, gutter, centerText, className, style, children, ...props })=>{
    const Component = as ?? "div";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cx"])("mx-auto", (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["twMaxWidthToClass"])(maxWidth), (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["twSpacingToClass"])("px", gutter), centerText ? "text-center" : undefined, className),
        style: style,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/ui/Center/index.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Center;
var _c;
__turbopack_context__.k.register(_c, "Center");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/Box/index.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Box",
    ()=>Box
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/tw.ts [client] (ecmascript)");
;
;
const Box = ({ as, padding, borderWidth, radius, borderColor, backgroundColor, colorClassName, className, style, children, ...props })=>{
    const Component = as ?? "div";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cx"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["twSpacingToClass"])("p", padding), (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["twBorderWidthToClass"])(borderWidth), (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["twRadiusToClass"])(radius), (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["twColorToClass"])("border", borderColor), (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$tw$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["twColorToClass"])("bg", backgroundColor), colorClassName, className),
        style: style,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/ui/Box/index.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Box;
var _c;
__turbopack_context__.k.register(_c, "Box");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/editor/components/feature/Form/index.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Form",
    ()=>Form
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Button$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/Button/index.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Cluster$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/Cluster/index.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Stack$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/Stack/index.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$utils$2f$datetime$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/utils/datetime.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$Form$2f$PostStatus$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/components/feature/Form/PostStatus.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$Form$2f$Input$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/components/feature/Form/Input.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$Form$2f$Textarea$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/components/feature/Form/Textarea.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$Form$2f$ImageForm$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/components/feature/Form/ImageForm.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Center$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/Center/index.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Box$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/Box/index.tsx [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
;
;
const Form = (props)=>{
    _s();
    const form = useForm(props);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: form.onSubmit,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Stack$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Stack"], {
            space: "8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlPanel, {
                    postId: props.postId,
                    form: form
                }, void 0, false, {
                    fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Center$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Center"], {
                    maxWidth: "prose",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Box$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
                        padding: "4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Stack$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Stack"], {
                            space: "4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Cluster$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Cluster"], {
                                    space: "1",
                                    align: "center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "title",
                                            className: "w-24 text-gray-600 dark:text-gray-400",
                                            children: "タイトル"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                                            lineNumber: 46,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$Form$2f$Input$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "title",
                                            onChange: form.handleTitleChange,
                                            value: form.values.title,
                                            className: "grow w-lg max-w-[90svw]"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                                            lineNumber: 52,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                                    lineNumber: 45,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Cluster$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Cluster"], {
                                    space: "2",
                                    align: "start",
                                    className: "mt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "body",
                                            className: "w-24 text-gray-600 dark:text-gray-400",
                                            children: "本文"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                                            lineNumber: 61,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Stack$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Stack"], {
                                            space: "4",
                                            className: "grow",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$Form$2f$Textarea$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                                    id: "body",
                                                    onChange: form.handleBodyChange,
                                                    rows: 16,
                                                    value: form.values.body,
                                                    className: "grow w-lg max-w-[90svw]"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                                                    lineNumber: 68,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$Form$2f$ImageForm$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["ImageForm"], {}, void 0, false, {
                                                    fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                                            lineNumber: 67,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                                    lineNumber: 60,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                            lineNumber: 44,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Form, "woqMTX6igxsX6/9vX4dQZlxR7yY=", false, function() {
    return [
        useForm
    ];
});
_c = Form;
const ControlPanel = ({ postId, form })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "inset-x-0 top-0 z-50 w-full shadow px-4 py-3 text-gray-700 shadow-sm backdrop-blur dark:border-neutral-700 dark:bg-neutral-900/95 dark:text-gray-300",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Stack$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Stack"], {
            space: "3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Cluster$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Cluster"], {
                    space: "3",
                    align: "center",
                    justify: "between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            prefetch: false,
                            className: "w-fit rounded px-2 py-2 text-sm font-medium underline hover:bg-neutral-200 dark:hover:bg-neutral-600",
                            children: "◀ 管理画面に戻る"
                        }, void 0, false, {
                            fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Cluster$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Cluster"], {
                            space: "3",
                            align: "center",
                            justify: "end",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$Form$2f$PostStatus$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["PostStatus"], {
                                    status: form.values.status
                                }, void 0, false, {
                                    fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                postId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviewLink, {
                                    postId: postId
                                }, void 0, false, {
                                    fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                                    lineNumber: 101,
                                    columnNumber: 24
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Button$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                                    theme: "secondary",
                                    size: "sm",
                                    type: "button",
                                    disabled: form.isSubmitting,
                                    onClick: form.handleDraftSave,
                                    children: "下書き保存"
                                }, void 0, false, {
                                    fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Button$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                                    theme: "primary",
                                    size: "sm",
                                    type: "submit",
                                    disabled: form.isSubmitting,
                                    children: "公開する"
                                }, void 0, false, {
                                    fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Cluster$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Cluster"], {
                    align: "center",
                    justify: "end",
                    className: "gap-x-6 gap-y-2 md:pl-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Cluster$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Cluster"], {
                        space: "2",
                        align: "center",
                        justify: "end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "publishedAtDate",
                                className: "whitespace-nowrap text-sm font-medium",
                                children: [
                                    "公開",
                                    form.values.status === "draft" ? "予定" : "",
                                    "日時"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Cluster$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Cluster"], {
                                space: "2",
                                align: "center",
                                justify: "end",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$Form$2f$Input$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "publishedAtDate",
                                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$utils$2f$datetime$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getISODateString"])(form.values.publishedAt),
                                        className: "rounded-md border border-gray-300 bg-white p-1 text-sm dark:border-neutral-700 dark:bg-neutral-950",
                                        onChange: form.handlePublishedAtDateChange,
                                        type: "date",
                                        "aria-label": "公開日"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                                        lineNumber: 135,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$Form$2f$Input$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "publishedAtTime",
                                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$utils$2f$datetime$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getTimeString"])(form.values.publishedAt),
                                        className: "rounded-md border border-gray-300 bg-white p-1 text-sm dark:border-neutral-700 dark:bg-neutral-950",
                                        onChange: form.handlePublishedAtTimeChange,
                                        type: "time",
                                        "aria-label": "公開時刻"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                                        lineNumber: 143,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                                lineNumber: 134,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                        lineNumber: 127,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
            lineNumber: 89,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = ControlPanel;
const useForm = (props)=>{
    _s1();
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(props.value?.title || "");
    const [body, setBody] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(props.value?.body || "");
    const [publishedAt, setPublishedAt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(props.value?.publishedAt || new Date());
    const [isSubmitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handlePublishedAtDateChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useForm.useCallback[handlePublishedAtDateChange]": (e)=>{
            const newDateString = e.target.value;
            const newDate = new Date(`${newDateString} ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$utils$2f$datetime$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getFullTimeString"])(publishedAt)}`);
            setPublishedAt(newDate);
        }
    }["useForm.useCallback[handlePublishedAtDateChange]"], [
        publishedAt
    ]);
    const handlePublishedAtTimeChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useForm.useCallback[handlePublishedAtTimeChange]": (e)=>{
            const newTimeString = e.target.value;
            const newDate = new Date(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$utils$2f$datetime$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getISODateString"])(publishedAt)} ${newTimeString}:00`);
            setPublishedAt(newDate);
        }
    }["useForm.useCallback[handlePublishedAtTimeChange]"], [
        publishedAt
    ]);
    const handleTitleChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useForm.useCallback[handleTitleChange]": (e)=>{
            setTitle(e.target.value);
        }
    }["useForm.useCallback[handleTitleChange]"], []);
    const handleBodyChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useForm.useCallback[handleBodyChange]": (e)=>{
            setBody(e.target.value);
        }
    }["useForm.useCallback[handleBodyChange]"], []);
    const handleDraftSave = async (e)=>{
        e.preventDefault();
        setSubmitting(false);
        const result = await props.onSubmit({
            publishedAt,
            title,
            body,
            status: "draft"
        });
        alert("記事を保存しました");
    };
    const resetForm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useForm.useCallback[resetForm]": ()=>{
            setTitle("");
            setBody("");
            setPublishedAt(new Date());
        }
    }["useForm.useCallback[resetForm]"], []);
    const onSubmit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useForm.useCallback[onSubmit]": async (e)=>{
            e.preventDefault();
            setSubmitting(true);
            const result = await props.onSubmit({
                publishedAt,
                title,
                body,
                status: "published"
            });
            if (result.isSuccess) {
                alert("記事を作成しました");
            } else {
                alert("記事を作成できませんでした");
            }
            setSubmitting(false);
            resetForm();
        }
    }["useForm.useCallback[onSubmit]"], [
        props.onSubmit,
        title,
        body,
        publishedAt
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useForm.useEffect": ()=>{
            const intervalId = setInterval({
                "useForm.useEffect.intervalId": ()=>{
                    if (props.value?.status === "draft") {
                        setPublishedAt(new Date());
                    }
                }
            }["useForm.useEffect.intervalId"], 30000);
            return ({
                "useForm.useEffect": ()=>{
                    clearInterval(intervalId);
                }
            })["useForm.useEffect"];
        }
    }["useForm.useEffect"], []);
    return {
        onSubmit,
        handleBodyChange,
        handleDraftSave,
        handlePublishedAtDateChange,
        handlePublishedAtTimeChange,
        handleTitleChange,
        isSubmitting,
        values: {
            title,
            body,
            publishedAt,
            status: props.value?.status || "draft"
        }
    };
};
_s1(useForm, "7F8Ns+w3WcYM+qSNF/Qc4bEzo7Q=");
const PreviewLink = ({ postId })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Button$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
        as: "a",
        href: `/posts/${postId}`,
        theme: "secondary",
        size: "sm",
        target: "_blank",
        rel: "noreferrer",
        children: "プレビュー"
    }, void 0, false, {
        fileName: "[project]/apps/editor/components/feature/Form/index.tsx",
        lineNumber: 273,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c2 = PreviewLink;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Form");
__turbopack_context__.k.register(_c1, "ControlPanel");
__turbopack_context__.k.register(_c2, "PreviewLink");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/editor/hooks/useBlockNavigation.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBlockNavigation",
    ()=>useBlockNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const useBlockNavigation = ()=>{
    _s();
    const blockNavigation = (e)=>{
        e.preventDefault();
        e.returnValue = "";
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useBlockNavigation.useEffect": ()=>{
            window.addEventListener("beforeunload", blockNavigation);
            return ({
                "useBlockNavigation.useEffect": ()=>{
                    window.removeEventListener("beforeunload", blockNavigation);
                }
            })["useBlockNavigation.useEffect"];
        }
    }["useBlockNavigation.useEffect"], []);
};
_s(useBlockNavigation, "OD7bBpZva5O2jO+Puf00hKivP7c=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/editor/hooks/useAuthorization.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthorization",
    ()=>useAuthorization
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$lib$2f$editor$2d$api$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/lib/editor-api.ts [client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
const useAuthorization = ()=>{
    _s();
    const [isAuthorized, setIsAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fetchUserSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAuthorization.useCallback[fetchUserSession]": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$lib$2f$editor$2d$api$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["get"])("/user_sessions/ping").then({
                "useAuthorization.useCallback[fetchUserSession]": (res)=>{
                    if (res.ok) {
                        setIsAuthorized(true);
                    }
                }
            }["useAuthorization.useCallback[fetchUserSession]"]);
        }
    }["useAuthorization.useCallback[fetchUserSession]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])(fetchUserSession, []);
    return {
        isAuthorized
    };
};
_s(useAuthorization, "qFuI9eTjRNR49UhSda28AhLfQ3I=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/editor/hooks/useFetchPostAsAdmin.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFetchPostAsAdmin",
    ()=>useFetchPostAsAdmin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$lib$2f$content$2d$api$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/lib/content-api.ts [client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
const useFetchPostAsAdmin = ({ postId })=>{
    _s();
    const [post, setPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFetchPostAsAdmin.useEffect": ()=>{
            if (!postId) {
                return;
            }
            setIsLoading(true);
            setError(null);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$lib$2f$content$2d$api$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["get"])(`/admin/posts/${postId}`).then({
                "useFetchPostAsAdmin.useEffect": (res)=>{
                    if (res.ok) {
                        res.json().then({
                            "useFetchPostAsAdmin.useEffect": (json)=>{
                                setPost(json);
                                setIsLoading(false);
                            }
                        }["useFetchPostAsAdmin.useEffect"]);
                        return;
                    }
                    setIsLoading(false);
                }
            }["useFetchPostAsAdmin.useEffect"]).catch({
                "useFetchPostAsAdmin.useEffect": (nextError)=>{
                    setError(nextError);
                    setIsLoading(false);
                }
            }["useFetchPostAsAdmin.useEffect"]);
        }
    }["useFetchPostAsAdmin.useEffect"], [
        postId
    ]);
    return {
        isLoading,
        post,
        error
    };
};
_s(useFetchPostAsAdmin, "sAcfYhHlMEuA4gQE0CKtOtO1Ebw=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/editor/components/feature/Main/styles.module.css [client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "root": "styles-module__7aonoG__root",
});
}),
"[project]/apps/editor/components/feature/Main/index.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$Main$2f$styles$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/apps/editor/components/feature/Main/styles.module.css [client] (css module)");
;
;
const Main = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$Main$2f$styles$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].root} mx-auto sm:my-8`,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/editor/components/feature/Main/index.tsx",
        lineNumber: 4,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = Main;
const __TURBOPACK__default__export__ = Main;
var _c;
__turbopack_context__.k.register(_c, "Main");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/icons/IconClosed.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This component uses Heroicons svg.
// Heroicons is licensed under the MIT License
// https://github.com/tailwindlabs/heroicons/blob/master/LICENSE
__turbopack_context__.s([
    "IconClosedIcon",
    ()=>IconClosedIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
const IconClosedIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "size-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
_c = IconClosedIcon;
var _c;
__turbopack_context__.k.register(_c, "IconClosedIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/icons/PencilSquare.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This component uses Heroicons svg.
// Heroicons is licensed under the MIT License
// https://github.com/tailwindlabs/heroicons/blob/master/LICENSE
__turbopack_context__.s([
    "PencilSquareIcon",
    ()=>PencilSquareIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
const PencilSquareIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "size-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
_c = PencilSquareIcon;
var _c;
__turbopack_context__.k.register(_c, "PencilSquareIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/icons/CodeBracket.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This component uses Heroicons svg.
// Heroicons is licensed under the MIT License
// https://github.com/tailwindlabs/heroicons/blob/master/LICENSE
__turbopack_context__.s([
    "CodeBracketIcon",
    ()=>CodeBracketIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
const CodeBracketIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "size-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
_c = CodeBracketIcon;
var _c;
__turbopack_context__.k.register(_c, "CodeBracketIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/ThemeToggle/index.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeToggle",
    ()=>ThemeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Cluster$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/Cluster/index.tsx [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
const STORAGE_KEY = "theme";
const getPreferredTheme = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
        return stored;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};
const applyThemeToDocument = (theme)=>{
    document.documentElement.classList.toggle("dark", theme === "dark");
};
const ThemeToggle = ({ size = "sm" })=>{
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeToggle.useEffect": ()=>{
            const preferred = getPreferredTheme();
            setTheme({
                "ThemeToggle.useEffect": (current)=>{
                    const next = current ?? preferred;
                    return next;
                }
            }["ThemeToggle.useEffect"]);
        }
    }["ThemeToggle.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeToggle.useEffect": ()=>{
            if (theme === null) {
                return;
            }
            applyThemeToDocument(theme);
            window.localStorage.setItem(STORAGE_KEY, theme);
        }
    }["ThemeToggle.useEffect"], [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Cluster$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Cluster"], {
        space: "2",
        align: "center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "sr-only",
                        children: "テーマ切り替え"
                    }, void 0, false, {
                        fileName: "[project]/packages/ui/ThemeToggle/index.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_s(ThemeToggle, "fOpw2txAiH5g/LkU7z1m68UDsT4=");
_c = ThemeToggle;
var _c;
__turbopack_context__.k.register(_c, "ThemeToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/editor/components/feature/AdminLayout/index.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminLayout",
    ()=>AdminLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$Main$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/components/feature/Main/index.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Button$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/Button/index.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$IconClosed$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/icons/IconClosed.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$PencilSquare$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/icons/PencilSquare.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$CodeBracket$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/icons/CodeBracket.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$ThemeToggle$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/ThemeToggle/index.tsx [client] (ecmascript)");
;
;
;
;
;
;
;
;
const AdminLayout = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: "gaaamiiのブログ"
                    }, void 0, false, {
                        fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                        lineNumber: 12,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AdminHeader, {}, void 0, false, {
                fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                lineNumber: 19,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$Main$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                lineNumber: 20,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
_c = AdminLayout;
const AdminHeader = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "w-full border-b px-4 py-4 sm:px-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "mx-auto flex w-full max-w-5xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "flex items-center gap-2 text-sm font-medium sm:text-base",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$IconClosed$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["IconClosedIcon"], {}, void 0, false, {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "flex flex-wrap items-center justify-start gap-2 lg:justify-end",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AdminHeaderNavItem, {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$ThemeToggle$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["ThemeToggle"], {}, void 0, false, {
                                fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                                lineNumber: 33,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AdminHeaderNavItem, {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Button$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                theme: "secondary",
                                href: "https://github.com/gaaamii/blog.gaaamii.jp",
                                as: "Link",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$CodeBracket$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["CodeBracketIcon"], {}, void 0, false, {
                                            fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                                            lineNumber: 43,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AdminHeaderNavItem, {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Button$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                                as: "Link",
                                size: "sm",
                                theme: "primary",
                                href: "/posts/new",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$icons$2f$PencilSquare$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["PencilSquareIcon"], {}, void 0, false, {
                                            fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
                                            lineNumber: 51,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_c1 = AdminHeader;
const AdminHeaderNavItem = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: "list-none",
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/editor/components/feature/AdminLayout/index.tsx",
        lineNumber: 63,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c2 = AdminHeaderNavItem;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "AdminLayout");
__turbopack_context__.k.register(_c1, "AdminHeader");
__turbopack_context__.k.register(_c2, "AdminHeaderNavItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/editor/pages/posts/[id]/edit.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$lib$2f$content$2d$api$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/lib/content-api.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$Form$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/components/feature/Form/index.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$hooks$2f$useBlockNavigation$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/hooks/useBlockNavigation.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$hooks$2f$useAuthorization$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/hooks/useAuthorization.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$hooks$2f$useFetchPostAsAdmin$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/hooks/useFetchPostAsAdmin.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$AdminLayout$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/editor/components/feature/AdminLayout/index.tsx [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
;
function EditPage() {
    _s();
    const { isAuthorized } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$hooks$2f$useAuthorization$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["useAuthorization"])();
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])().query;
    const { post, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$hooks$2f$useFetchPostAsAdmin$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["useFetchPostAsAdmin"])({
        postId: id
    });
    const { initialValues, onSubmit } = useEditForm({
        post
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$hooks$2f$useBlockNavigation$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["useBlockNavigation"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$AdminLayout$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["AdminLayout"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                    children: "記事を編集する - gaaamiiのブログ"
                }, void 0, false, {
                    fileName: "[project]/apps/editor/pages/posts/[id]/edit.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/editor/pages/posts/[id]/edit.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: "読込中..."
                    }, void 0, false, {
                        fileName: "[project]/apps/editor/pages/posts/[id]/edit.tsx",
                        lineNumber: 27,
                        columnNumber: 23
                    }, this),
                    isAuthorized && !isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$components$2f$feature$2f$Form$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Form"], {
                        onSubmit: onSubmit,
                        value: initialValues,
                        postId: post.id
                    }, void 0, false, {
                        fileName: "[project]/apps/editor/pages/posts/[id]/edit.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/editor/pages/posts/[id]/edit.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_s(EditPage, "P74VE8Mcz7VKZ+zHGlcpURdupSE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$hooks$2f$useAuthorization$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["useAuthorization"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$hooks$2f$useFetchPostAsAdmin$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["useFetchPostAsAdmin"],
        useEditForm,
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$hooks$2f$useBlockNavigation$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["useBlockNavigation"]
    ];
});
_c = EditPage;
const useEditForm = ({ post })=>{
    _s1();
    const initialValues = post ? {
        title: post.title,
        body: post.body,
        publishedAt: post.published_at ? new Date(post.published_at) : null,
        status: post.status
    } : null;
    const onSubmit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEditForm.useCallback[onSubmit]": async (value)=>{
            if (!post) {
                return {
                    isSuccess: false
                };
            }
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$editor$2f$lib$2f$content$2d$api$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["put"])(`/posts/${post.id}`, toParams(value));
            return {
                isSuccess: res.ok
            };
        }
    }["useEditForm.useCallback[onSubmit]"], [
        post
    ]);
    return {
        initialValues,
        onSubmit
    };
};
_s1(useEditForm, "n48B5Cx+nCBgkwtdslSIEffu5bQ=");
const toParams = (value)=>({
        post: {
            title: value.title,
            body: value.body,
            published_at: value.publishedAt.toISOString(),
            status: value.status
        }
    });
var _c;
__turbopack_context__.k.register(_c, "EditPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/apps/editor/pages/posts/[id]/edit.tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/posts/[id]/edit";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/apps/editor/pages/posts/[id]/edit.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/apps/editor/pages/posts/[id]/edit.tsx\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/apps/editor/pages/posts/[id]/edit.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__845a0d10._.js.map