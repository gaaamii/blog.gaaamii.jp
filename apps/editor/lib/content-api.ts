import { isDevelopment } from "@gaaamii/utils/environment";

const PROD_API_BASE_URL =
  process.env.NEXT_PUBLIC_SITE_API_BASE_URL || "https://api.gaaamii.jp";
const DEV_API_BASE_URL =
  process.env.NEXT_PUBLIC_SITE_API_BASE_URL || "http://localhost:3000/api/mock";

function getAPIBaseURL() {
  return isDevelopment() ? DEV_API_BASE_URL : PROD_API_BASE_URL;
}

const requestInitBase: RequestInit = {
  mode: "cors",
  credentials: "include",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
};

export async function get(path: string): Promise<Response> {
  return request(path, { ...requestInitBase, method: "GET" });
}

export async function post(
  path: string,
  body: Record<string, unknown>,
): Promise<Response> {
  return request(path, {
    ...requestInitBase,
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function put(
  path: string,
  body: Record<string, unknown>,
): Promise<Response> {
  return request(path, {
    ...requestInitBase,
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function destroy(path: string): Promise<Response> {
  return request(path, {
    ...requestInitBase,
    method: "DELETE",
  });
}

async function request(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${getAPIBaseURL()}${path}`, init);
}
