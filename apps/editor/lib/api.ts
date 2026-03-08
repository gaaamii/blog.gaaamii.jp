import { isDevelopment } from "@gaaamii/utils/environment";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (isDevelopment() ? "http://localhost:3001/api/mock" : "https://api.gaaamii.jp");

const requestInitBase: RequestInit = {
  mode: "cors",
  credentials: "include",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
};

function getAPIBaseURL() {
  return API_BASE_URL;
}

async function request(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${getAPIBaseURL()}${path}`, init);
}

export const api = {
  get(path: string): Promise<Response> {
    return request(path, {
      ...requestInitBase,
      method: "GET",
    });
  },
  post(path: string, body: Record<string, unknown>): Promise<Response> {
    return request(path, {
      ...requestInitBase,
      method: "POST",
      body: JSON.stringify(body),
    });
  },
  put(path: string, body: Record<string, unknown>): Promise<Response> {
    return request(path, {
      ...requestInitBase,
      method: "PUT",
      body: JSON.stringify(body),
    });
  },
  destroy(path: string): Promise<Response> {
    return request(path, {
      ...requestInitBase,
      method: "DELETE",
    });
  },
};
