import { isDevelopment } from "./environment";

const PROD_API_BASE_URL = "https://api.gaaamii.jp";
const DEV_API_BASE_URL = "http://localhost:3000/api/mock";

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
  const response = await request(path, { ...requestInitBase, method: "GET" });
  return response;
}

export async function post(
  path: string,
  body: Record<string, unknown>,
): Promise<Response> {
  const response = await request(path, {
    ...requestInitBase,
    method: "POST",
    body: JSON.stringify(body),
  });
  return response;
}

export async function put(
  path: string,
  body: Record<string, unknown>,
): Promise<Response> {
  const response = await request(path, {
    ...requestInitBase,
    method: "PUT",
    body: JSON.stringify(body),
  });

  return response;
}

async function request(path: string, init?: RequestInit): Promise<Response> {
  const baseURL = getAPIBaseURL();
  const url = `${baseURL}${path}`;
  return await fetch(url, init);
}
