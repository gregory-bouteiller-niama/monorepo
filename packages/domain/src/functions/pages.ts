import { readAllAttendants } from "./attendants";
import { readAllDisciplines } from "./disciplines";
import { SITE_ADDRESS, SITE_OWNER } from "./site";

// INDEX -----------------------------------------------------------------------------------------------------------------------------------
export const readIndexPage = () => ({
  attendants: {
    description:
      "Il est toujours plus agréable et plus éclairant de cheminer avec quelqu'un. Nos accompagnants vous invitent à explorer les sentiers, à leurs côtés, au rythme de votre intuition et vous partagent les expériences de leurs propres pas.",
    items: readAllAttendants(),
    title: "puis votre accompagnant",
  },
  contact: {
    description:
      "Notre portail, actuellement à ses prémices, est amené lui aussi à grandir en vous proposant plus de choix et de fonctionnalités. N'hésitez pas à nous contacter si vous souhaitez entamer un parcours, proposer votre voie ou devenir vous-même accompagnant. Sentez-vous libres de nous faire part de vos remarques ou poser vos questions.",
    title: "Et arpentez le chemin...",
  },
  hero: {
    description:
      "Une constellation d'accompagnants rassemblés autour d'une philosophie commune : vous guider sur le chemin de votre alignement intérieur.",
    title: "L'équilibre invisible rendu tangible",
  },
  disciplines: {
    description:
      "Nous vous proposons différentes pistes sur lesquelles sillonner. Aucune n'est exclusive ou ne détient à elle seule la vérité. Optez simplement pour celle avec laquelle votre Être résonne dans le moment présent et sentez vous libre d'en explorer d'autres par la suite.",
    items: readAllDisciplines(),
    title: "Choisissez votre voie",
  },
});
export type ReadIndexPageProps = ReturnType<typeof readIndexPage>;

// LEGAL -----------------------------------------------------------------------------------------------------------------------------------
const ownerAddress = `${SITE_ADDRESS.street}, ${SITE_ADDRESS.postalCode} ${SITE_ADDRESS.locality}, ${SITE_ADDRESS.country}`;
const contactParagraph = { email: SITE_OWNER.email, prefix: "Courriel : " } as const;

export const readLegalPage = () => ({
  description:
    "Informations légales et politique de confidentialité relatives à l'édition, à l'hébergement et au traitement des données personnelles sur niama.fr.",
  legal: {
    cards: [
      {
        content: [`Nom : ${SITE_OWNER.name}`, `Adresse : ${ownerAddress}`, contactParagraph],
        title: "Éditeur du site",
      },
      {
        content: [SITE_OWNER.name],
        title: "Directeur de publication",
      },
      {
        content: [
          "Hébergeur : Cloudflare, Inc.",
          "Adresse : 101 Townsend St, San Francisco, CA 94107, USA",
          "Téléphone : +1 (650) 319-8930",
        ],
        title: "Hébergement",
      },
      {
        content: [
          "Sauf mention contraire, les textes, visuels, éléments graphiques, logos et contenus présents sur ce site sont protégés par le droit de la propriété intellectuelle. Toute reproduction, représentation, adaptation ou exploitation, totale ou partielle, sans autorisation préalable écrite, est interdite.",
        ],
        title: "Propriété intellectuelle",
      },
      {
        content: [
          "Les informations publiées sur ce site sont fournies à titre informatif. Malgré le soin apporté à leur rédaction, l'éditeur ne peut garantir l'exactitude, l'exhaustivité ou l'actualité permanente de l'ensemble des contenus. Le site peut être modifié, suspendu ou interrompu à tout moment, sans préavis.",
        ],
        title: "Responsabilité",
      },
    ],
    description:
      "Identification de l'éditeur du site, du directeur de publication, de l'hébergeur et rappel des règles de responsabilité et de propriété intellectuelle.",
    id: "informations-legales",
    title: "Informations légales",
  },
  privacy: {
    cards: [
      {
        content: [`Nom : ${SITE_OWNER.name}`, `Adresse : ${ownerAddress}`, contactParagraph],
        title: "Responsable du traitement",
      },
      {
        content: [
          "Lorsque vous utilisez le formulaire de contact, les données suivantes peuvent être collectées : prénom, nom, adresse électronique, sujet de la demande, discipline sélectionnée et contenu du message.",
        ],
        title: "Données collectées",
      },
      {
        content: [
          "Ces données sont utilisées pour recevoir, traiter et suivre votre demande, ainsi que pour vous répondre par courrier électronique.",
          "Le traitement repose, selon la nature de votre demande, sur l'exécution de mesures précontractuelles prises à votre initiative ou sur l'intérêt légitime de répondre aux messages adressés via le site.",
        ],
        title: "Finalités et base juridique",
      },
      {
        content: [
          `Les données sont accessibles uniquement à ${SITE_OWNER.name} et, lorsque cela est nécessaire, à ses prestataires techniques.`,
          "Le site est hébergé via Cloudflare et les données du formulaire sont stockées au moyen de l'infrastructure technique Convex.",
        ],
        title: "Destinataires des données",
      },
      {
        content: [
          "Les données liées aux demandes de contact sont conservées pendant une durée maximale de trois ans à compter du dernier échange émanant de la personne concernée.",
          "Si une relation contractuelle est ensuite engagée, certaines données peuvent être conservées plus longtemps pour respecter les obligations légales ou comptables applicables.",
        ],
        title: "Durée de conservation",
      },
      {
        content: [
          "Vous pouvez demander l'accès à vos données, leur rectification, leur effacement, la limitation du traitement ou vous opposer au traitement, dans les conditions prévues par la réglementation applicable.",
          { email: SITE_OWNER.email, prefix: "Vous pouvez exercer vos droits en écrivant à ", suffix: "." },
          "Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL.",
        ],
        title: "Vos droits",
      },
      {
        content: [
          "À ce jour, le site ne dépose pas de cookies publicitaires ni de mesure d'audience déclarés sur cette page.",
          "Un stockage local peut toutefois être utilisé pour mémoriser votre préférence d'affichage du thème clair ou sombre.",
        ],
        title: "Cookies et stockage local",
      },
      {
        content: ["Dernière mise à jour : 5 mai 2026."],
        title: "Mise à jour",
      },
    ],
    description:
      "Informations relatives aux données collectées via le site, à leurs finalités, à leur durée de conservation et à vos droits.",
    id: "confidentialite",
    title: "Politique de confidentialité",
  },
  title: "Mentions légales | níama",
});
export type ReadLegalPageProps = ReturnType<typeof readLegalPage>;
