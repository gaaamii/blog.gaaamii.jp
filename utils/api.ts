const API_HOST = process.env.API_HOST;

const requestInitBase: RequestInit = {
  mode: "cors",
  credentials: "include",
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
