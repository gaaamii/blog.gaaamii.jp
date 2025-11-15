import { isDevelopment } from "./environment";

type NextRequestInit = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

const PROD_API_BASE_URL = "https://api.gaaamii.jp";
const DEV_API_BASE_URL = "http://localhost:3000/api/mock";

function getAPIBaseURL() {
  return isDevelopment() ? DEV_API_BASE_URL : PROD_API_BASE_URL;
}

const requestInitBase: NextRequestInit = {
  mode: "cors",
  credentials: "include",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
};

export async function get(
  path: string,
  init?: NextRequestInit,
): Promise<Response> {
  const response = await request(path, {
    ...requestInitBase,
    ...init,
    method: "GET",
  });
  return response;
}

export async function post(
  path: string,
  body: Record<string, unknown>,
  init?: NextRequestInit,
): Promise<Response> {
  const response = await request(path, {
    ...requestInitBase,
    method: "POST",
    body: JSON.stringify(body),
    ...init,
  });
  return response;
}

export async function put(
  path: string,
  body: Record<string, unknown>,
  init?: NextRequestInit,
): Promise<Response> {
  const response = await request(path, {
    ...requestInitBase,
    method: "PUT",
    body: JSON.stringify(body),
    ...init,
  });

  return response;
}

export async function destroy(
  path: string,
  init?: NextRequestInit,
): Promise<Response> {
  const response = await request(path, {
    ...requestInitBase,
    method: "DELETE",
    ...init,
  });

  return response;
}

async function request(path: string, init?: NextRequestInit): Promise<Response> {
  const baseURL = getAPIBaseURL();
  const url = `${baseURL}${path}`;
  return await fetch(url, init);
}
