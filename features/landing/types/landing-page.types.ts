import type { StaticImageData } from "next/image";

/**
 * Contrats du module « landing » (page d’accueil marketing).
 *
 * Principes utilisés :
 * - **S** (SRP) : chaque type décrit une seule brique fonctionnelle (couverture, hero, etc.).
 * - **I** (ISP) : les composants ne reçoivent que les données dont ils ont besoin (pas le modèle entier systématiquement).
 */

/** Couverture affichée dans la grille « tendances » (données + image optimisable par next/image). */
export type LandingStoryCover = {
  readonly id: string;
  readonly title: string;
  readonly image: StaticImageData;
};

/** Bloc hero : message principal + visuel principal. */
export type LandingHeroModel = {
  readonly eyebrow: string;
  readonly title: string;
  readonly subtitle: string;
  readonly primaryCtaLabel: string;
  readonly secondaryCtaLabel: string;
  readonly heroImage: StaticImageData;
  readonly heroImageAlt: string;
};

/** Navigation du header — prête à être branchée plus tard sur un vrai routing / i18n. */
export type LandingNavItem = {
  readonly label: string;
  readonly href: string;
  /** Affiche un chevron (menu déroulant à brancher plus tard). */
  readonly hasDropdown?: boolean;
};

export type LandingHeaderModel = {
  readonly brandLabel: string;
  readonly logo: StaticImageData;
  readonly logoAlt: string;
  readonly navItems: readonly LandingNavItem[];
  readonly searchPlaceholder: string;
  readonly searchAriaLabel: string;
  readonly downloadAppLabel: string;
  readonly loginLabel: string;
  readonly signupLabel: string;
};

export type LandingTrendingModel = {
  readonly sectionTitle: string;
  readonly seeAllLabel: string;
  readonly stories: readonly LandingStoryCover[];
};

/** Bandeau « mise en avant » (style Wattpad) : fond pastel + ligne de parcours certifiants. */
export type LandingCommunityPromoModel = {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly ctaLabel: string;
  readonly stories: readonly LandingStoryCover[];
  readonly decorationImage: StaticImageData;
  readonly decorationAlt: string;
};

export type LandingAuthorBannerModel = {
  readonly backdropImage: StaticImageData;
  readonly backdropAlt: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly ctaLabel: string;
};

export type LandingCategoryTag = {
  readonly id: string;
  readonly label: string;
};

/** Bloc « domaines IT » : pastilles cliquables (futurs filtres catalogue). */
export type LandingCategoriesModel = {
  readonly title: string;
  readonly subtitle: string;
  readonly tags: readonly LandingCategoryTag[];
  readonly illustration: StaticImageData;
  readonly illustrationAlt: string;
};

export type LandingFooterLink = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
};

/** Bas de landing: visuel immersif puis vague sombre avec liens légaux/navigation. */
export type LandingFooterModel = {
  readonly showcaseImage: StaticImageData;
  readonly showcaseAlt: string;
  readonly links: readonly LandingFooterLink[];
  readonly copyright: string;
};

/**
 * Modèle unique assemblé côté serveur pour la page.
 * Évite aux sections de faire des imports dispersés dans `assets/`.
 */
export type LandingPageModel = {
  readonly header: LandingHeaderModel;
  readonly hero: LandingHeroModel;
  readonly trending: LandingTrendingModel;
  readonly communityPromo: LandingCommunityPromoModel;
  readonly categories: LandingCategoriesModel;
  readonly authorBanner: LandingAuthorBannerModel;
  readonly footer: LandingFooterModel;
};
