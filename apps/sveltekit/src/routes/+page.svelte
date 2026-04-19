<script lang="ts">
  import type { Contacts } from "@niama/domain/functions/contacts";
  import { INDEX_PAGE, nativeHashUpdater, updateHash } from "@niama/ui/shared/index-page";
  import { ContactForm } from "@niama/ui/svelte/contact-form";
  import { Section } from "@niama/ui/svelte/section";
  import { Separator } from "@niama/ui/svelte/separator";
  import { onMount } from "svelte";
  import { toast } from "svelte-sonner";
  import AttendantsCarousel from "$lib/components/attendants-carousel.svelte";
  import DisciplinesCarousel from "$lib/components/disciplines-carousel.svelte";

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

  onMount(() => updateHash(nativeHashUpdater));
</script>

<div class={INDEX_PAGE.base()}>
  <Section class={INDEX_PAGE.hero()} id="top-3">
    <div class={INDEX_PAGE.heroContent()}>
      <h1 class={INDEX_PAGE.heroTitle()}>{data.hero.title}</h1>
      <p class={INDEX_PAGE.heroDescription()}>{data.hero.description}</p>
    </div>
  </Section>
  <Section id="les-voies" {...data.disciplines} withSeparator> <DisciplinesCarousel items={data.disciplines.items} /> </Section>
  <Section id="les-accompagnants" {...data.attendants} withSeparator>
    <AttendantsCarousel autoplay={10} items={data.attendants.items} />
  </Section>
  <Section id="contact" {...data.contact} withSeparator>
    <ContactForm
      onSubmit={createContact}
      onSuccess={() => toast.success("Merci de votre intérêt ! Nous reviendrons vers vous très bientôt.")}
    />
    <Separator class="self-center! mb-34 h-24" orientation="vertical" />
  </Section>
</div>
