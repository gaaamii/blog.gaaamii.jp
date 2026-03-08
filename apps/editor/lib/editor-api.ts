const API_BASE_URL = "/api/mock";

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
  return fetch(`${API_BASE_URL}${path}`, init);
}
