"use client";

import type { ReactNode } from "react";

import { AuthProvider } from "@/features/auth/context/auth-provider";
import { AuthToast } from "@/features/auth/components/auth-toast";

export function AppProviders({ children }: { readonly children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <AuthToast />
    </AuthProvider>
  );
}
