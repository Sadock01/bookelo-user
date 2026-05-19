export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/** Politique API : 8+ caractères, une majuscule, une minuscule, un chiffre. */
export function validatePassword(password: string): string | null {
  if (password.length < 8) {
    return "Le mot de passe doit contenir au moins 8 caractères.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Ajoutez au moins une lettre majuscule.";
  }
  if (!/[a-z]/.test(password)) {
    return "Ajoutez au moins une lettre minuscule.";
  }
  if (!/[0-9]/.test(password)) {
    return "Ajoutez au moins un chiffre.";
  }
  return null;
}

export function readApiErrorMessage(body: unknown, fallback: string): string {
  if (typeof body === "object" && body !== null) {
    if ("message" in body && typeof (body as { message: unknown }).message === "string") {
      return (body as { message: string }).message;
    }
    if ("error" in body && typeof (body as { error: unknown }).error === "string") {
      return (body as { error: string }).error;
    }
  }
  return fallback;
}
