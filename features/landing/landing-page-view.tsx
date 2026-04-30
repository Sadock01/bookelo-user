import { LandingAuthorBanner } from "@/features/landing/components/landing-author-banner";
import { LandingCategoriesSection } from "@/features/landing/components/landing-categories-section";
import { LandingCommunityPromo } from "@/features/landing/components/landing-community-promo";
import { LandingFooter } from "@/features/landing/components/landing-footer";
import { LandingHeader } from "@/features/landing/components/landing-header";
import { LandingHero } from "@/features/landing/components/landing-hero";
import { LandingTrendingSection } from "@/features/landing/components/landing-trending-section";
import { getLandingPageModel } from "@/features/landing/data/get-landing-page-model";

/**
 * Vue assemblée de la page d’accueil marketing Bookelo.
 *
 * Rôle : **composition uniquement** (SOLID — **S**). La donnée vient de `getLandingPageModel`.
 * Pour ajouter une section : créer un composant dédié + l’insérer ici + étendre le modèle si besoin (**O**).
 */
export function LandingPageView() {
  const page = getLandingPageModel();

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#111827] antialiased">
      <LandingHeader model={page.header} />
      <main>
        <LandingHero model={page.hero} />
        <LandingTrendingSection model={page.trending} />
        <LandingCommunityPromo model={page.communityPromo} />
        <LandingCategoriesSection model={page.categories} />
        <LandingAuthorBanner model={page.authorBanner} />
        <LandingFooter model={page.footer} />
      </main>
    </div>
  );
}
