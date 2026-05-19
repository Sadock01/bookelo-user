import { RegisterForm } from "@/features/auth/components/register-form";
import { getCategories } from "@/lib/api/categories";
import { hasApiBaseUrl } from "@/lib/api/config";

export default async function RegisterPage() {
  let categories: Awaited<ReturnType<typeof getCategories>> = [];

  if (hasApiBaseUrl()) {
    try {
      categories = await getCategories();
    } catch {
      categories = [];
    }
  }

  return <RegisterForm categories={categories} />;
}
