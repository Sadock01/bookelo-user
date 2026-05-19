"use client";

import { RegisterWizard } from "@/features/auth/components/register-wizard";
import type { Category } from "@/lib/api/types";

type RegisterFormProps = {
  readonly categories: readonly Category[];
};

/** Inscription multi-étapes (style X / Twitter). */
export function RegisterForm({ categories }: RegisterFormProps) {
  return <RegisterWizard categories={categories} />;
}
