import { isDevelopment } from "@gaaamii/utils/environment";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_SITE_API_BASE_URL ||
  (isDevelopment() ? "http://localhost:3000/api/mock" : "https://api.gaaamii.jp");

function getAPIBaseURL() {
  return API_BASE_URL;
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

async function request(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${getAPIBaseURL()}${path}`, init);
}
