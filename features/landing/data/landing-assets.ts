/**
 * Point d’entrée unique pour les médias utilisés par la landing.
 *
 * Pourquoi un fichier séparé ?
 * - **SRP** : la page et les composants ne gèrent pas les chemins d’images.
 * - **Maintenance** : remplacer une maquette ne touche qu’ici.
 */

import bannerVisual from "@/assets/new_mok_03.png";
import coverOne from "@/assets/mokeup_2.png";
import coverTwo from "@/assets/mokup_03.png";
import asset2 from "@/assets/asset2.png";
import heroArtwork from "@/assets/new_mok_02.png";
import lastTemp from "@/assets/last_temp.png";
import lisseArtwork from "@/assets/lisse.png";
import logoIcon from "@/assets/book_ic.png";

/** Visuel « promo / étagère » (remplacer si vous ajoutez de nouveau un mockup dédié). */
const promoVisual = asset2;

export const landingAssets = {
  logoIcon,
  heroArtwork,
  lisseArtwork,
  promoVisual,
  bannerVisual,
  lastTemp,
  trendingCovers: { coverOne, coverTwo } as const,
} as const;
