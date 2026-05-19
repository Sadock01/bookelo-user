import type { Book } from "@/lib/api/types";

/** Catalogue local utilisé quand aucune API backend n'est configurée (dev / démo). */
export const MOCK_CATALOG: readonly Book[] = [
  {
    id: "mock-security-plus",
    title: "CompTIA Security+ — Préparation complète",
    author: "Bookelo",
    description: "Parcours aligné sur le référentiel Security+.",
    language: "FR",
    level: "Intermédiaire",
    price: 15000,
  },
  {
    id: "mock-python-pcap",
    title: "Python — PCAP & bonnes pratiques",
    author: "Bookelo",
    description: "Scripts, structures et préparation PCAP.",
    language: "FR",
    level: "Débutant",
    price: 12000,
  },
  {
    id: "mock-cyber-fondamentaux",
    title: "Cybersécurité — Fondamentaux & socle",
    author: "Bookelo",
    language: "FR",
    price: 10000,
  },
  {
    id: "mock-reseau-ccna",
    title: "Réseaux & interconnexion — Parcours guidé",
    author: "Bookelo",
    language: "FR",
    price: 14000,
  },
  {
    id: "mock-devops-cloud",
    title: "Cloud & DevOps — Certification & mise en pratique",
    author: "Bookelo",
    language: "FR",
    price: 18000,
  },
  {
    id: "mock-cisco",
    title: "Cisco CCNA — Fondations réseau",
    author: "Bookelo",
    language: "FR",
    price: 16000,
  },
  {
    id: "mock-pentest",
    title: "Pentest & ethical hacking — Initiation",
    author: "Bookelo",
    language: "FR",
    price: 20000,
  },
] as const;

export function searchMockCatalog(query: string): readonly Book[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return MOCK_CATALOG;

  return MOCK_CATALOG.filter((book) => {
    const haystack = [book.title, book.author, book.description]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}
