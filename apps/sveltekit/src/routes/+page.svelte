<script lang="ts">
  import type { Contacts } from "@niama/domain/functions/contacts";
  import { INDEX_PAGE, nativeHashUpdater, updateHash } from "@niama/ui/index-page";
  import { AttendantsCarousel } from "@niama/ui-svelte/attendants/carousel";
  import { ContactForm } from "@niama/ui-svelte/contact-form";
  import { DisciplinesCarousel } from "@niama/ui-svelte/disciplines/carousel";
  import { Section } from "@niama/ui-svelte/ui/section";
  import { Separator } from "@niama/ui-svelte/ui/separator";
  import { onMount } from "svelte";
  import { toast } from "svelte-sonner";
  import { goto } from "$app/navigation";

  let { data } = $props();

  const createContact = async (value: Contacts["CreateValues"]) => {
    const response = await fetch("/api/contact", {
      body: JSON.stringify(value),
      headers: { "content-type": "application/json" },
      method: "POST",
    });

    if (response.ok) {
      return;
    }

    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(payload?.error ?? "Une erreur est survenue.");
  };

  onMount(() => updateHash((hash) => goto(`#${hash}`, { replaceState: true, noScroll: true })));
</script>

<div class={INDEX_PAGE.base()}>
  <Section class={INDEX_PAGE.hero()} id="top-3">
    <div class={INDEX_PAGE.heroContent()}>
      <h1 class={INDEX_PAGE.heroTitle()}>{data.hero.title}</h1>
      <p class={INDEX_PAGE.heroDescription()}>{data.hero.description}</p>
    </div>
  </Section>
  <Section description={data.disciplines.description} id="les-voies" tabindex={-1} title={data.disciplines.title} withSeparator>
    <DisciplinesCarousel items={data.disciplines.items} />
  </Section>
  <Section description={data.attendants.description} id="les-accompagnants" title={data.attendants.title} withSeparator>
    <AttendantsCarousel items={data.attendants.items} />
  </Section>
  <Section description={data.contact.description} id="contact" title={data.contact.title} withSeparator>
    <ContactForm
      onSubmit={createContact}
      onSuccess={() => toast.success("Merci de votre intérêt ! Nous reviendrons vers vous très bientôt.")}
    />
    <Separator class="self-center! mb-34 h-24" orientation="vertical" />
  </Section>
</div>
