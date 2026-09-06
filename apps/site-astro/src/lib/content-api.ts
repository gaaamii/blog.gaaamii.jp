import type { Post, PostStatus } from "@gaaamii/domain/post";

type Fetch = typeof globalThis.fetch;

type RequestOptions = {
  apiBaseUrl?: URL;
  fetchImplementation?: Fetch;
};

const getApiBaseUrl = () => {
  const value = import.meta.env.SITE_API_BASE_URL;

  if (!value) {
    throw new Error("SITE_API_BASE_URL is required to build the Astro site");
  }

  try {
    const url = new URL(value);
    url.pathname = `${url.pathname.replace(/\/$/, "")}/`;
    return url;
  } catch (cause) {
    throw new Error("SITE_API_BASE_URL must be an absolute URL", { cause });
  }
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const postStatuses: readonly PostStatus[] = ["published", "draft"];

const parsePost = (value: unknown, location: string): Post => {
  if (!isRecord(value)) {
    throw new Error(`${location} must be an object`);
  }

  if (!Number.isSafeInteger(value.id) || Number(value.id) <= 0) {
    throw new Error(`${location}.id must be a positive safe integer`);
  }

  if (typeof value.title !== "string") {
    throw new Error(`${location}.title must be a string`);
  }

  if (typeof value.body !== "string") {
    throw new Error(`${location}.body must be a string`);
  }

  if (
    typeof value.published_at !== "string" ||
    Number.isNaN(Date.parse(value.published_at))
  ) {
    throw new Error(`${location}.published_at must be an ISO date string`);
  }

  if (
    typeof value.status !== "string" ||
    !postStatuses.includes(value.status as PostStatus)
  ) {
    throw new Error(`${location}.status must be published or draft`);
  }

  return value as Post;
};

const parsePosts = (value: unknown): Post[] => {
  if (!Array.isArray(value)) {
    throw new Error("response must be an array");
  }

  return value.map((post, index) => parsePost(post, `response[${index}]`));
};

const request = async <T>(
  path: string,
  parse: (value: unknown) => T,
  options: RequestOptions = {},
): Promise<T> => {
  const apiBaseUrl = options.apiBaseUrl ?? getApiBaseUrl();
  const fetchImplementation = options.fetchImplementation ?? globalThis.fetch;
  const url = new URL(path, apiBaseUrl).toString();
  let response: Response;

  try {
    response = await fetchImplementation(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10_000),
    });
  } catch (cause) {
    throw new Error(`Content API request failed: ${url}`, { cause });
  }

  if (!response.ok) {
    throw new Error(`Content API returned HTTP ${response.status}: ${url}`);
  }

  let value: unknown;
  try {
    value = await response.json();
  } catch (cause) {
    throw new Error(`Invalid Content API response from ${url}: invalid JSON`, {
      cause,
    });
  }

  try {
    return parse(value);
  } catch (cause) {
    const reason = cause instanceof Error ? cause.message : "unexpected shape";
    throw new Error(`Invalid Content API response from ${url}: ${reason}`, {
      cause,
    });
  }
};

export const fetchPosts = (options?: RequestOptions) =>
  request("posts", parsePosts, options);

export const fetchPost = (id: number, options?: RequestOptions) =>
  request(`posts/${id}`, (value) => parsePost(value, "response"), options);
