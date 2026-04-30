/**
 * Point d’entrée public du feature « landing ».
 *
 * Importez uniquement depuis `@/features/landing` dans `app/page.tsx`
 * pour garder les routes Next.js minces et éviter les cycles d’imports.
 */

export { LandingPageView } from "./landing-page-view";
export { getLandingPageModel } from "./data/get-landing-page-model";
export type { LandingPageModel } from "./types/landing-page.types";
