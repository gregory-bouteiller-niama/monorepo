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

export const SITE_OWNER = {
  email: SEO.email,
  name: "Grégory Bouteiller",
} as const;

export const SITE_ADDRESS = {
  country: "France",
  locality: "La Rivière Saint-Louis",
  postalCode: "97421",
  region: "La Réunion",
  street: "39 chemin des Longanis",
} as const;

const { socials } = readPublicLayout();

const address = {
  "@type": "PostalAddress",
  addressCountry: "FR",
  addressLocality: SITE_ADDRESS.locality,
  addressRegion: SITE_ADDRESS.region,
  postalCode: SITE_ADDRESS.postalCode,
  streetAddress: SITE_ADDRESS.street,
} as const;

const contactPoint = {
  "@type": "ContactPoint",
  availableLanguage: ["fr"],
  contactType: "customer support",
  email: SITE_OWNER.email,
  url: `${SEO.url}/mentions-legales`,
} as const;

// STRUCTURED DATA -------------------------------------------------------------------------------------------------------------------------
export const createStructuredData = () => [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    address,
    contactPoint,
    email: SITE_OWNER.email,
    founder: {
      "@type": "Person",
      address,
      name: SITE_OWNER.name,
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
