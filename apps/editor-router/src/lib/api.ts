const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/mock";

const requestInitBase: RequestInit = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
};

async function request(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${API_BASE_URL}${path}`, init);
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
