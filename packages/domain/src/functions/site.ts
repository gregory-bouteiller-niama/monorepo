import { readPublicLayout } from "./layouts";

// CONSTS ----------------------------------------------------------------------------------------------------------------------------------
export const SEO = {
  defaultDescription:
    "Une constellation d'accompagnants rassemblés autour d'une philosophie commune : vous guider sur le chemin de votre alignement intérieur.",
  defaultTitle: "níama | l'équilibre invisible devenu tangible",
  email: "contact@niama.fr",
  language: "fr-FR",
  locale: "fr_FR",
  name: "níama",
  url: "https://niama.fr",
} as const;

const { socials } = readPublicLayout();

const address = {
  "@type": "PostalAddress",
  addressCountry: "FR",
  addressLocality: "La Rivière Saint-Louis",
  addressRegion: "La Réunion",
  postalCode: "97421",
  streetAddress: "39 chemin des Longanis",
} as const;

const contactPoint = {
  "@type": "ContactPoint",
  availableLanguage: ["fr"],
  contactType: "customer support",
  email: SEO.email,
  url: `${SEO.url}/mentions-legales`,
} as const;

// STRUCTURED DATA -------------------------------------------------------------------------------------------------------------------------
export const createStructuredData = () => [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    address,
    contactPoint,
    email: SEO.email,
    founder: {
      "@type": "Person",
      address,
      name: "Gregory Bouteiller",
    },
    name: SEO.name,
    sameAs: socials.map(({ href }) => href),
    url: SEO.url,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    inLanguage: SEO.language,
    name: SEO.name,
    publisher: {
      "@type": "Organization",
      name: SEO.name,
      url: SEO.url,
    },
    url: SEO.url,
  },
];
