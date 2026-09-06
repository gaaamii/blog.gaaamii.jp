import type { Post, PostStatus } from "@gaaamii/domain/post";

type Fetch = typeof globalThis.fetch;

export class ContentApiError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = new.target.name;
  }
}

export class ContentApiConfigurationError extends ContentApiError {}

export class ContentApiNetworkError extends ContentApiError {
  constructor(
    readonly url: string,
    cause: unknown,
  ) {
    super(`Content API request failed: ${url}`, { cause });
  }
}

export class ContentApiHttpError extends ContentApiError {
  constructor(
    readonly url: string,
    readonly status: number,
  ) {
    super(`Content API returned HTTP ${status}: ${url}`);
  }
}

export class ContentApiNotFoundError extends ContentApiHttpError {}

export class ContentApiInvalidResponseError extends ContentApiError {
  constructor(
    readonly url: string,
    message: string,
    options?: ErrorOptions,
  ) {
    super(`Invalid Content API response from ${url}: ${message}`, options);
  }
}

const getApiBaseUrl = () => {
  const value = import.meta.env.SITE_API_BASE_URL;

  if (!value) {
    throw new ContentApiConfigurationError(
      "SITE_API_BASE_URL is required to build the Astro site",
    );
  }

  try {
    const url = new URL(value);
    url.pathname = `${url.pathname.replace(/\/$/, "")}/`;
    return url;
  } catch (cause) {
    throw new ContentApiConfigurationError(
      "SITE_API_BASE_URL must be an absolute URL",
      { cause },
    );
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

export class ContentApiClient {
  constructor(
    private readonly apiBaseUrl = getApiBaseUrl(),
    private readonly fetchImplementation: Fetch = globalThis.fetch,
  ) {}

  getPosts(): Promise<Post[]> {
    return this.get("posts", parsePosts);
  }

  getPost(id: number): Promise<Post> {
    return this.get(`posts/${id}`, (value) => parsePost(value, "response"));
  }

  private async get<T>(path: string, parse: (value: unknown) => T): Promise<T> {
    const url = new URL(path, this.apiBaseUrl).toString();
    let response: Response;

    try {
      response = await this.fetchImplementation(url, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(10_000),
      });
    } catch (cause) {
      throw new ContentApiNetworkError(url, cause);
    }

    if (!response.ok) {
      if (response.status === 404) {
        throw new ContentApiNotFoundError(url, response.status);
      }
      throw new ContentApiHttpError(url, response.status);
    }

    let value: unknown;
    try {
      value = await response.json();
    } catch (cause) {
      throw new ContentApiInvalidResponseError(url, "body is not valid JSON", {
        cause,
      });
    }

    try {
      return parse(value);
    } catch (cause) {
      throw new ContentApiInvalidResponseError(
        url,
        cause instanceof Error ? cause.message : "unexpected shape",
        { cause },
      );
    }
  }
}
