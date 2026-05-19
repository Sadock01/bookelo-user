"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/context/auth-provider";
import { CatalogTopBar } from "@/features/catalog/components/catalog-top-bar";
import { LANDING_SHELL } from "@/features/landing/constants/landing-layout";

function BenefitRow({
  title,
  description,
  status,
}: {
  readonly title: string;
  readonly description: string;
  readonly status: "active" | "soon";
}) {
  return (
    <li className="flex gap-4 rounded-xl border border-[#e5e7eb] bg-white p-4">
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          status === "active" ? "bg-[#169283] text-white" : "bg-[#f3f4f6] text-[#6b7280]"
        }`}
        aria-hidden
      >
        {status === "active" ? "✓" : "…"}
      </span>
      <div>
        <p className="font-semibold text-[#111827]">{title}</p>
        <p className="mt-1 text-sm text-[#6b7280]">{description}</p>
      </div>
    </li>
  );
}

export function AccountDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isReady, logout } = useAuth();

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace("/login?next=/account");
    }
  }, [isReady, isAuthenticated, router]);

  if (!isReady || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <CatalogTopBar />
        <div className={`${LANDING_SHELL} py-16 text-center text-sm text-[#6b7280]`}>
          Chargement de votre compte…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#111827]">
      <CatalogTopBar />

      <main className={`${LANDING_SHELL} py-10 md:py-14`}>
        <div className="rounded-2xl border border-[#96f1e7]/60 bg-gradient-to-br from-[#f0fdf9] to-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#169283]">Mon compte</p>
          <h1 className="mt-2 font-[var(--font-poppins)] text-3xl font-bold text-[#111827]">
            Bonjour, {user.name}
          </h1>
          <p className="mt-2 text-sm text-[#6b7280]">{user.email}</p>
          <p className="mt-4 inline-flex rounded-full bg-[#169283]/10 px-3 py-1 text-xs font-semibold text-[#169283]">
            Session active · rôle {user.role}
          </p>
        </div>

        <section className="mt-10" aria-labelledby="account-benefits-title">
          <h2 id="account-benefits-title" className="text-lg font-bold text-[#111827]">
            Ce que votre compte débloque
          </h2>
          <ul className="mt-4 space-y-3">
            <BenefitRow
              status="active"
              title="Session reconnue partout sur le site"
              description="Le menu affiche votre nom, vos droits livres sont recalculés avec votre compte."
            />
            <BenefitRow
              status="active"
              title="Droits par livre (extrait & achat)"
              description="Sur chaque fiche, Bookelo indique si vous pouvez lire l’extrait, si vous avez acheté le titre, ou la lecture complète."
            />
            <BenefitRow
              status="soon"
              title="Achat et lecture complète"
              description="Le paiement et le flux PDF intégral seront disponibles dès que le checkout API sera branché."
            />
            <BenefitRow
              status="soon"
              title="Bibliothèque & favoris"
              description="Sauvegarde de parcours et listes personnelles — en cours côté produit."
            />
          </ul>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/books"
            className="rounded-full bg-[#169283] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#0f6b5e]"
          >
            Parcourir le catalogue
          </Link>
          <button
            type="button"
            onClick={() => logout()}
            className="rounded-full border border-[#e5e7eb] bg-white px-6 py-2.5 text-sm font-semibold text-[#b91c1c] hover:bg-[#fef2f2]"
          >
            Se déconnecter
          </button>
        </div>
      </main>
    </div>
  );
}
