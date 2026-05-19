const PUBLIC_ENV = "NEXT_PUBLIC_API_URL";
const SERVER_ENV_KEYS = ["API_URL", "BACKEND_API_URL", PUBLIC_ENV] as const;

function readEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

/** Résout l'URL de base (serveur : API_URL ou NEXT_PUBLIC ; client : NEXT_PUBLIC uniquement). */
export function resolveApiBaseUrl(options: { readonly client?: boolean } = {}): string | undefined {
  const fromPublic = readEnv(PUBLIC_ENV);
  if (options.client) {
    return fromPublic;
  }

  return (
    fromPublic ??
    readEnv("API_URL") ??
    readEnv("BACKEND_API_URL")
  );
}

export function hasApiBaseUrl(options: { readonly client?: boolean } = {}): boolean {
  return Boolean(resolveApiBaseUrl(options));
}

export function getApiBaseUrl(options: { readonly client?: boolean } = {}): string {
  const base = resolveApiBaseUrl(options);
  if (!base) {
    throw new Error(
      `URL API manquante. Ajoutez dans .env.local : API_URL=https://votre-backend.com (ou ${PUBLIC_ENV}=…), puis redémarrez « npm run dev ».`,
    );
  }
  return base.replace(/\/$/, "");
}

export function getApiConfigHint(): string {
  const checked = SERVER_ENV_KEYS.map((key) => {
    const value = readEnv(key);
    return value ? `${key}=${value}` : `${key}=(non défini)`;
  });
  return checked.join(" · ");
}
