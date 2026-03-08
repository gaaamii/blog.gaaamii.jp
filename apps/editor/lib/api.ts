import { isDevelopment } from "@gaaamii/utils/environment";

const CONTENT_PROD_API_BASE_URL =
  process.env.NEXT_PUBLIC_SITE_API_BASE_URL || "https://api.gaaamii.jp";
const CONTENT_DEV_API_BASE_URL =
  process.env.NEXT_PUBLIC_SITE_API_BASE_URL || "http://localhost:3000/api/mock";

const EDITOR_PROD_API_BASE_URL =
  process.env.NEXT_PUBLIC_EDITOR_API_BASE_URL || "https://api.gaaamii.jp";
const EDITOR_DEV_API_BASE_URL =
  process.env.EDITOR_API_BASE_URL || "http://localhost:3001/api/mock";

const requestInitBase: RequestInit = {
  mode: "cors",
  credentials: "include",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
};

function getContentAPIBaseURL() {
  return isDevelopment() ? CONTENT_DEV_API_BASE_URL : CONTENT_PROD_API_BASE_URL;
}

function getEditorAPIBaseURL() {
  return isDevelopment() ? EDITOR_DEV_API_BASE_URL : EDITOR_PROD_API_BASE_URL;
}

async function request(
  baseURL: string,
  path: string,
  init?: RequestInit,
): Promise<Response> {
  return fetch(`${baseURL}${path}`, init);
}

export const contentApi = {
  get(path: string): Promise<Response> {
    return request(getContentAPIBaseURL(), path, {
      ...requestInitBase,
      method: "GET",
    });
  },
  post(path: string, body: Record<string, unknown>): Promise<Response> {
    return request(getContentAPIBaseURL(), path, {
      ...requestInitBase,
      method: "POST",
      body: JSON.stringify(body),
    });
  },
  put(path: string, body: Record<string, unknown>): Promise<Response> {
    return request(getContentAPIBaseURL(), path, {
      ...requestInitBase,
      method: "PUT",
      body: JSON.stringify(body),
    });
  },
  destroy(path: string): Promise<Response> {
    return request(getContentAPIBaseURL(), path, {
      ...requestInitBase,
      method: "DELETE",
    });
  },
};

export const editorApi = {
  get(path: string): Promise<Response> {
    return request(getEditorAPIBaseURL(), path, {
      ...requestInitBase,
      method: "GET",
    });
  },
};
