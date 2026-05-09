import { SEO } from "@niama/domain/functions/site";
import { initialize } from "@niama/ui/root-layout";
import { themeScript } from "@niama/ui/theme";
import { HydrationScript, type JSX } from "@solidjs/web";
import { createRootRoute, HeadContent, ScriptOnce, Scripts } from "@tanstack/solid-router";
import { onSettled } from "solid-js";
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
  onSettled(initialize);

  return (
    <html lang="fr">
      <head>
        <HeadContent />
        <HydrationScript />
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
