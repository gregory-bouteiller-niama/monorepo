import { Sky } from "@niama/ui-solid/sky";
import { createFileRoute, Outlet } from "@tanstack/solid-router";
import { readPublicLayout } from "@/lib/layouts";
import { TheFooter } from "./_public/-the-footer";
import { TheHeader } from "./_public/-the-header";

export const Route = createFileRoute("/_public")({
  component: PublicLayout,
  loader: () => readPublicLayout(),
});

function PublicLayout() {
  const data = Route.useLoaderData();
  const { navs, socials } = data();

  return (
    <>
      <Sky class="fixed inset-0" />
      <TheHeader navs={navs} />
      <Outlet />
      <TheFooter socials={socials} />
    </>
  );
}
