import { getApiBaseUrl } from "@/lib/api/config";
import { ApiError } from "@/lib/api/errors";

export type PublicRequestOptions = {
  readonly method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  readonly query?: Record<string, string | number | boolean | undefined | null>;
  readonly body?: unknown;
  readonly headers?: HeadersInit;
  readonly cache?: RequestCache;
  readonly next?: NextFetchRequestConfig;
  /** Envoie Authorization: Bearer si fourni (ex. GET /books/{id}/access). */
  readonly token?: string;
};

function buildUrl(path: string, query?: PublicRequestOptions["query"]): string {
  const base = getApiBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${base}${normalizedPath}`);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null || value === "") continue;
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

async function parseJsonBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

export async function publicApiRequest<T>(
  path: string,
  options: PublicRequestOptions = {},
): Promise<T> {
  const { method = "GET", query, body, headers, cache, next, token } = options;

  const requestHeaders = new Headers(headers);
  if (body !== undefined && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }
  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(buildUrl(path, query), {
    method,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache,
    next,
  });

  const parsedBody = await parseJsonBody(response);

  if (!response.ok) {
    const message =
      typeof parsedBody === "object" &&
      parsedBody !== null &&
      "message" in parsedBody &&
      typeof (parsedBody as { message: unknown }).message === "string"
        ? (parsedBody as { message: string }).message
        : `Erreur API ${response.status}`;
    throw new ApiError(message, response.status, parsedBody);
  }

  return parsedBody as T;
}

/** Suit une réponse 302 et retourne l'URL de redirection (preview, etc.). */
export async function publicApiRedirectUrl(
  path: string,
  options: Omit<PublicRequestOptions, "method" | "body"> = {},
): Promise<string> {
  const { query, headers, cache, next, token } = options;
  const requestHeaders = new Headers(headers);
  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(buildUrl(path, query), {
    method: "GET",
    headers: requestHeaders,
    redirect: "manual",
    cache,
    next,
  });

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("Location");
    if (location) return location;
  }

  if (response.ok) {
    const parsed = await parseJsonBody(response);
    if (typeof parsed === "object" && parsed !== null && "url" in parsed) {
      const url = (parsed as { url: unknown }).url;
      if (typeof url === "string") return url;
    }
  }

  const parsedBody = await parseJsonBody(response);
  throw new ApiError(
    `Redirection attendue pour ${path}`,
    response.status,
    parsedBody,
  );
}
