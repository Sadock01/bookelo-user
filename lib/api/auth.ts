import { getApiBaseUrl } from "@/lib/api/config";
import { publicApiRequest } from "@/lib/api/client";
import type {
  AppLanguage,
  LoginResponse,
  MessageResponse,
  RegisterPayload,
  RegisterResponse,
} from "@/lib/api/types";

export async function registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
  return publicApiRequest<RegisterResponse>("/auth/register", {
    method: "POST",
    body: payload,
    cache: "no-store",
  });
}

export function getVerifyEmailUrl(token: string): string {
  const base = getApiBaseUrl();
  const url = new URL(`${base}/auth/verify-email`);
  url.searchParams.set("token", token);
  return url.toString();
}

export async function verifyEmailWithCode(payload: {
  readonly email: string;
  readonly code: string;
  readonly redirect?: boolean;
}): Promise<MessageResponse> {
  return publicApiRequest<MessageResponse>("/auth/verify-email-code", {
    method: "POST",
    body: payload,
    cache: "no-store",
  });
}

export async function resendVerificationEmail(payload: {
  readonly email: string;
}): Promise<MessageResponse> {
  return publicApiRequest<MessageResponse>("/auth/resend-verification", {
    method: "POST",
    body: payload,
    cache: "no-store",
  });
}

export async function loginUser(payload: {
  readonly email: string;
  readonly password: string;
}): Promise<LoginResponse> {
  return publicApiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: payload,
    cache: "no-store",
  });
}

export async function forgotPassword(payload: { readonly email: string }): Promise<MessageResponse> {
  return publicApiRequest<MessageResponse>("/auth/forgot-password", {
    method: "POST",
    body: payload,
    cache: "no-store",
  });
}

export async function resetPassword(payload: {
  readonly token: string;
  readonly newPassword: string;
}): Promise<MessageResponse> {
  return publicApiRequest<MessageResponse>("/auth/reset-password", {
    method: "POST",
    body: payload,
    cache: "no-store",
  });
}

export type { AppLanguage };
