/**
 * Fabrique du modèle de la landing (couche données / présentation).
 *
 * À terme vous pouvez remplacer cette fonction par :
 * - un fetch CMS,
 * - des traductions (i18n),
 * sans modifier les composants visuels (principe **D** du SOLID — dépendre d’abstractions).
 */

import type { LandingPageModel } from "@/features/landing/types/landing-page.types";

import { landingAssets } from "./landing-assets";

export function getLandingPageModel(): LandingPageModel {
  const { logoIcon, heroArtwork, lisseArtwork, promoVisual, bannerVisual, lastTemp, trendingCovers } =
    landingAssets;

  const trendingStories = [
    {
      id: "security-plus",
      title: "CompTIA Security+ — Préparation complète",
      image: trendingCovers.coverOne,
    },
    {
      id: "python-pcap",
      title: "Python — PCAP & bonnes pratiques",
      image: trendingCovers.coverTwo,
    },
    {
      id: "cyber-fondamentaux",
      title: "Cybersécurité — Fondamentaux & socle",
      image: promoVisual,
    },
    {
      id: "reseau-ccna",
      title: "Réseaux & interconnexion — Parcours guidé",
      image: bannerVisual,
    },
    {
      id: "devops-cloud",
      title: "Cloud & DevOps — Certification & mise en pratique",
      image: lastTemp,
    },
  ] as const;

  const spotlightStories = trendingStories.slice(0, 4);

  return {
    header: {
      brandLabel: "Bookelo",
      logo: logoIcon,
      logoAlt: "Logo Bookelo",
      navItems: [
        { label: "Parcourir", href: "#parcours", hasDropdown: true },
        { label: "Communauté", href: "#communaute", hasDropdown: true },
      ],
      searchPlaceholder: "Security+, Python, Cisco…",
      searchAriaLabel: "Rechercher un parcours, un livre ou une certification",
      downloadAppLabel: "Télécharger l'application",
      loginLabel: "Se connecter",
      signupLabel: "S'inscrire",
    },
    hero: {
      eyebrow: "Certifications IT · Sécurité & programmation",
      title: "Préparez votre certification. Réussissez l'examen au bon moment.",
      subtitle:
        "Bookelo regroupe des contenus de lecture alignés sur les référentiels officiels. Avancez dans votre parcours, puis accédez — après inscription et paiement — aux liens et codes d'accès à l'examen fournis selon les modalités Bookelo et les certificateurs partenaires.",
      primaryCtaLabel: "Voir les parcours",
      secondaryCtaLabel: "Découvrir Security+ & Python",
      heroImage: heroArtwork,
      heroImageAlt: "Illustration plateforme Bookelo — préparation aux certifications IT",
    },
    trending: {
      sectionTitle: "Les parcours les plus consultés",
      seeAllLabel: "Tout afficher",
      stories: [...trendingStories],
    },
    communityPromo: {
      eyebrow: "À lire sans faute avant l'examen",
      title: "Préparez votre certification avec des contenus structurés pour le monde réel.",
      body: "Sécurité offensive et défensive, programmation, réseaux : des supports pensés pour vous projeter dans les scénarios d'examen et les environnements professionnels.",
      ctaLabel: "Explorer les contenus",
      stories: [...spotlightStories],
      decorationImage: promoVisual,
      decorationAlt: "Visuel pédagogique Bookelo",
    },
    categories: {
      title: "Trouvez votre voie en IT",
      subtitle:
        "Filtrez par domaine : la plateforme couvre la préparation aux certifications en sécurité informatique et en programmation (élargissement possible selon le catalogue).",
      illustration: lisseArtwork,
      illustrationAlt: "Exploration des domaines IT sur Bookelo",
      tags: [
        { id: "secplus", label: "CompTIA Security+" },
        { id: "cisco", label: "Cisco / CCNA" },
        { id: "python", label: "Python & scripting" },
        { id: "cyberdef", label: "Cybersécurité défensive" },
        { id: "iam", label: "IAM & identité" },
        { id: "cloud", label: "Cloud & DevOps" },
        { id: "pentest", label: "Pentest & ethical hacking" },
        { id: "prog", label: "Programmation générale" },
      ],
    },
    authorBanner: {
      backdropImage: bannerVisual,
      backdropAlt: "Ambiance certification Bookelo",
      eyebrow: "Inscription · Paiement · Accès examen",
      title: "Après votre inscription, Bookelo vous guide vers les étapes d'accès à la certification.",
      body: "Une fois votre compte créé et le parcours souscrit, vous recevez les informations pour obtenir les liens, codes ou vouchers nécessaires — selon les partenaires certificateurs et les modalités en vigueur.",
      ctaLabel: "Créer un compte",
    },
    footer: {
      showcaseImage: lastTemp,
      showcaseAlt: "Univers visuel Bookelo",
      links: [
        { id: "catalogue", label: "Parcours certifiants", href: "#" },
        { id: "app", label: "Télécharger l'application", href: "#" },
        { id: "partenaires", label: "Partenariats", href: "#" },
        { id: "carriere", label: "Carrières", href: "#" },
        { id: "confidentialite", label: "Confidentialité", href: "#" },
        { id: "conditions", label: "Conditions d'utilisation", href: "#" },
        { id: "paiement", label: "Politique de paiement", href: "#" },
        { id: "aide", label: "Aide", href: "#" },
      ],
      copyright: "© 2026 Bookelo",
    },
  };
}
