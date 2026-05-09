import { readIndexPage } from "@niama/domain/functions/pages";
import { INDEX_PAGE, nativeHashUpdater, updateHash } from "@niama/ui/index-page";
import { createFileRoute } from "@tanstack/solid-router";
import { onSettled } from "solid-js";
import { AttendantsCarousel } from "@/components/attendants/carousel";
import { DisciplinesCarousel } from "@/components/disciplines/carousel";
import { Section } from "@/components/section";
import { Separator } from "@/components/separator";
// import { ContactForm } from "./index/-contact-form";

export const Route = createFileRoute("/_public/")({
  component: IndexPage,
  loader: () => readIndexPage(),
});

function IndexPage() {
  const data = Route.useLoaderData();
  const { attendants, contact, disciplines, hero } = data();

  onSettled(() => updateHash(nativeHashUpdater));

  return (
    <div class={INDEX_PAGE.base()}>
      <Section class={INDEX_PAGE.hero()} id="top-3">
        <div class={INDEX_PAGE.heroContent()}>
          <h1 class={INDEX_PAGE.heroTitle()}>{hero.title}</h1>
          <p class={INDEX_PAGE.heroDescription()}>{hero.description}</p>
        </div>
      </Section>
      <Section id="les-voies" {...disciplines} withSeparator>
        <DisciplinesCarousel items={disciplines.items} />
      </Section>
      <Section id="les-accompagnants" {...attendants} withSeparator>
        <AttendantsCarousel items={attendants.items} />
      </Section>
      <Section id="contact" {...contact} withSeparator>
        {/* <ContactForm /> */}
        <Separator class="self-center! mb-34 h-24" orientation="vertical" />
      </Section>
    </div>
  );
}
