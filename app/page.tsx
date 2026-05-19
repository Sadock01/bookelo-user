import { LandingPageView } from "@/features/landing";

/**
 * Route racine `/` — délègue tout le UI au module `features/landing`.
 *
 * Pourquoi ce fichier reste minimal ?
 * - **S** : le routeur Next ne connaît que « quelle vue servir », pas les détails de la landing.
 * - Nouveaux développeurs : suivre `features/landing/` pour toute évolution marketing.
 */

export default async function HomePage() {
  return <LandingPageView />;
}
