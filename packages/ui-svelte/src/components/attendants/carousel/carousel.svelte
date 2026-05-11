<script lang="ts">
  import type { Attendants } from "@niama/domain/functions/attendants";
  import { ATTENDANT, ATTENDANTS, AUTOPLAY, ROTATIONS } from "@niama/ui/attendants/carousel";
  import { createCarouselStore } from "@niama/ui/carousel";
  import { DisciplinesBadge } from "@niama/ui-svelte/disciplines/badge";
  import { Card, CardContent, CardDescription, CardHeader, type CardProps, CardTitle } from "@niama/ui-svelte/ui/card";
  import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@niama/ui-svelte/ui/carousel";
  import { Image } from "@unpic/svelte";
  import Autoplay from "embla-carousel-autoplay";
  import Ssr from "embla-carousel-ssr";
  import type { Snippet } from "svelte";

  let { items }: { items: Attendants["Entity"][] } = $props();
  let flippedName = $state<string | undefined>();

  const store = createCarouselStore({ loop: true }, [Autoplay({ delay: AUTOPLAY }), Ssr()]);
</script>

<section class={ATTENDANTS.base()}>
  <Carousel class={ATTENDANTS.carousel()} {store}>
    <CarouselContent viewportClass={ATTENDANTS.viewport()}>
      {#each items as item, index (item.name)}
        <CarouselItem class={ATTENDANTS.item()}>
          {@render attendantsItem({ index, isFlipped: flippedName === item.name, item, onToggle: () => { flippedName = flippedName === item.name ? undefined : item.name; } })}
        </CarouselItem>
      {/each}
    </CarouselContent>
    <aside class={ATTENDANTS.controls()}>
      <CarouselPrevious aria-label="Participant précédent" class={ATTENDANTS.control()} />
      <CarouselNext aria-label="Participant suivant" class={ATTENDANTS.control()} />
    </aside>
  </Carousel>
</section>

{#snippet attendantsItem({index, isFlipped, item, onToggle}: {index: number, isFlipped: boolean, item: Attendants["Entity"], onToggle: () => void})}
  <button
    aria-label={`Afficher la fiche de ${item.name}`}
    aria-pressed={isFlipped}
    class={ATTENDANT.base({ className: ROTATIONS[index % ROTATIONS.length] })}
    data-flipped={isFlipped}
    onclick={onToggle}
    type="button"
  >
    {@render attendantsItemCard(item, attendantsItemCardFront, {})}
    {@render attendantsItemCard(item, attendantsItemCardBack, { "data-back": true })}
  </button>
{/snippet}

{#snippet attendantsItemCard(item: Attendants["Entity"], child: Snippet<[Attendants["Entity"]]>, props: CardProps)}
  <Card class={ATTENDANT.card()} {...props}>
    <CardHeader>
      <CardTitle class={ATTENDANT.title()}>{item.name}</CardTitle>
      <CardDescription class={ATTENDANT.badges()}>
        {#each item.disciplines as discipline (discipline.slug)}
          <DisciplinesBadge slug={discipline.slug} />
        {/each}
      </CardDescription>
    </CardHeader>
    {@render child(item)}
  </Card>
{/snippet}

{#snippet attendantsItemCardFront(item: Attendants["Entity"])}
  <CardContent class={ATTENDANT.image()}>
    <div class={ATTENDANT.overlay()}>
      <span class={ATTENDANT.icon()}></span>
    </div>
    <Image {...item.image} operations={{ imagekit: { f: "avif" } }} sizes="(min-width: 640px) 420px, 100vw" />
  </CardContent>
{/snippet}

{#snippet attendantsItemCardBack(item: Attendants["Entity"])}
  <CardContent class={ATTENDANT.description()}>
    {#each item.description as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
  </CardContent>
{/snippet}
