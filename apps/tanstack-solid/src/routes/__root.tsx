import { SEO } from "@niama/domain/functions/site";
import { initialize } from "@niama/ui/root-layout";
import { themeScript } from "@niama/ui/theme";
import { createRootRoute, HeadContent, ScriptOnce, Scripts } from "@tanstack/solid-router";
import { type JSX, onMount } from "solid-js";
import { HydrationScript } from "solid-js/web";
import appCss from "@/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SEO.defaultTitle },
      { name: "description", content: SEO.defaultDescription },
      { name: "keywords", content: "accompagnants, équilibre, alignement" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/logo.svg" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument(props: RootDocumentProps) {
  onMount(initialize);

  return (
    <html lang="fr">
      <head>
        <HydrationScript />
        <HeadContent />
        <ScriptOnce>{themeScript}</ScriptOnce>
      </head>
      <body class="group/body">
        {props.children}
        <Scripts />
      </body>
    </html>
  );
}

type RootDocumentProps = {
  children: JSX.Element;
};
