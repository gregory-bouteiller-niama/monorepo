export const allDisciplines = [
  {
    description: [
      "Le Yog'art associe yoga et exploration artistique au cours de séances mêlant respiration, mouvement et création afin de favoriser la détente et la présence à soi.",
      "Cette approche soutient le bien-être et invite à développer une meilleure connaissance de soi, sans pression ni jugement.",
    ],
    name: "yog'art",
    slug: "yogart",
    title: "Yog'art",
  },
  {
    description: [
      "L'hypnose spirituelle vous amène à explorer les facettes de votre Être qui se manifestent sur différents plans, dans un état expansé de conscience.",
      "Par cette connexion à votre partie sage, l'accompagnant fait émerger de vous les enseignements propices à votre parcours.",
    ],
    name: "anima",
    slug: "anima",
    title: "Hypnose spirituelle",
  },
  {
    description: [
      "L'hormèse subtile allie le concept d'hormèse, consistant à apporter au corps physique un stress modéré afin de le renforcer, et l'applique au niveau des corps subtils.",
      "Par un échange verbal, l'accompagnant suscite le juste mouvement en vous afin de vous aider à retrouver votre alignement.",
    ],
    name: "animus",
    slug: "animus",
    title: "Hormèse subtile",
  },
  {
    description: [
      "On utilise plusieurs cartes du ciel pour pratiquer l'astrologie de coaching.",
      "Après étude de ces mouvements planétaires, lors de la consultation, l'astrologue se balade de manière intuitive dans différentes temporalités afin de répondre au mieux aux problématiques rencontrées.",
    ],
    name: "astro",
    slug: "astro",
    title: "Astro",
  },
] as const;

export const disciplineFrom = (entry: Disciplines["Entry"]) => entry;

export const readAllDisciplines = () => allDisciplines.map(disciplineFrom);

export const readDisciplineBySlug = (slug: Disciplines["Entry"]["slug"]) => {
  const discipline = allDisciplines.find((discipline) => discipline.slug === slug);
  if (!discipline) throw new Error(`unknown discipline slug: ${slug}`);
  return discipline;
};

export const readDiscisplinesBySlug = (slugs: Disciplines["Entry"]["slug"][]) =>
  allDisciplines.filter(({ slug }) => slugs.includes(slug)).map(disciplineFrom);

export type Disciplines = { Entity: ReturnType<typeof disciplineFrom>; Entry: (typeof allDisciplines)[number] };
