import { Sky } from "@niama/ui-react/sky";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { readPublicLayout } from "@/lib/layouts";
import { TheFooter } from "./_public/-the-footer";
import { TheHeader } from "./_public/-the-header";

// ROUTE -----------------------------------------------------------------------------------------------------------------------------------
export const Route = createFileRoute("/_public")({
  component: PublicLayout,
  loader: () => readPublicLayout(),
});

// LAYOUT ----------------------------------------------------------------------------------------------------------------------------------
function PublicLayout() {
  const { navs, socials } = Route.useLoaderData();

  return (
    <>
      <Sky className="fixed inset-0" />
      <TheHeader navs={navs} />
      <Outlet />
      <TheFooter socials={socials} />
    </>
  );
}
