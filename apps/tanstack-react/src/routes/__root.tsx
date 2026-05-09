import { SEO } from "@niama/domain/functions/site";
import { initialize } from "@niama/ui/root-layout";
import { themeScript } from "@niama/ui/theme";
import { Toaster } from "@niama/ui-react/sonner";
import { TooltipProvider } from "@niama/ui-react/tooltip";
import { createRootRoute, HeadContent, ScriptOnce, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";
import appCss from "@/styles.css?url";

// ROUTE -----------------------------------------------------------------------------------------------------------------------------------
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

// DOCUMENT --------------------------------------------------------------------------------------------------------------------------------
function RootDocument({ children }: RootDocumentProps) {
  useEffect(initialize, []);

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <ScriptOnce>{themeScript}</ScriptOnce>
        <HeadContent />
      </head>
      <body className="group/body">
        <TooltipProvider>
          {children}
          <Toaster position="bottom-center" richColors />
        </TooltipProvider>
        <Scripts />
      </body>
    </html>
  );
}
type RootDocumentProps = React.PropsWithChildren;
