const API_HOST = "https://api.gaaamii.jp";

const requestInitBase: RequestInit = {
  mode: "cors",
  credentials: "include",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
};

export async function get(path: string): Promise<Response> {
  const url = `${API_HOST}${path}`;
  return fetch(url, { ...requestInitBase, method: "GET" });
}
export async function post(
  path: string,
  body: Record<string, unknown>
): Promise<Response> {
  const url = `${API_HOST}${path}`;
  return fetch(url, {
    ...requestInitBase,
    method: "POST",
    body: JSON.stringify(body),
  });
}
