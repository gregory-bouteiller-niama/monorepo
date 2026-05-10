<script lang="ts">
  import type { Attendants } from "@niama/domain/functions/attendants";
  import { ATTENDANT, ATTENDANTS, AUTOPLAY, ROTATIONS } from "@niama/ui/attendants/carousel";
  import { createCarouselStore } from "@niama/ui/carousel";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@niama/ui-svelte/ui/card";
  import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@niama/ui-svelte/ui/carousel";
  import { Image } from "@unpic/svelte";
  import Autoplay from "embla-carousel-autoplay";
  import Ssr from "embla-carousel-ssr";
  import DisciplinesBadge from "$lib/components/disciplines/badge.svelte";

  let { items }: { items: Attendants["Entity"][] } = $props();
  let flippedName = $state<string | undefined>();

  const store = createCarouselStore({ loop: true }, [Autoplay({ delay: AUTOPLAY }), Ssr()]);
</script>

<section class={ATTENDANTS.base()}>
  <Carousel class={ATTENDANTS.carousel()} {store}>
    <CarouselContent viewportClass={ATTENDANTS.viewport()}>
      {#each items as item, index (item.name)}
        <CarouselItem class={ATTENDANTS.item()}>
          <button
            aria-label={`Afficher la fiche de ${item.name}`}
            aria-pressed={flippedName === item.name}
            class={ATTENDANT.base({ className: ROTATIONS[index % ROTATIONS.length] })}
            data-flipped={flippedName === item.name}
            onclick={() => {
              flippedName = flippedName === item.name ? undefined : item.name;
            }}
            type="button"
          >
            <Card class={ATTENDANT.card()}>
              <CardHeader>
                <CardTitle class={ATTENDANT.title()}>{item.name}</CardTitle>
                <CardDescription class={ATTENDANT.badges()}>
                  {#each item.disciplines as discipline (discipline.slug)}
                    <DisciplinesBadge slug={discipline.slug} />
                  {/each}
                </CardDescription>
              </CardHeader>
              <CardContent class={ATTENDANT.image()}>
                <div class={ATTENDANT.overlay()}>
                  <span class={ATTENDANT.icon()}></span>
                </div>
                <Image {...item.image} operations={{ imagekit: { f: "avif" } }} sizes="(min-width: 640px) 420px, 100vw" />
              </CardContent>
            </Card>
            <Card class={ATTENDANT.card()} data-back>
              <CardHeader>
                <CardTitle class={ATTENDANT.title()}>{item.name}</CardTitle>
                <CardDescription class={ATTENDANT.badges()}>
                  {#each item.disciplines as discipline (discipline.slug)}
                    <DisciplinesBadge slug={discipline.slug} />
                  {/each}
                </CardDescription>
              </CardHeader>
              <CardContent class={ATTENDANT.description()}>
                {#each item.description as paragraph (paragraph)}
                  <p>{paragraph}</p>
                {/each}
              </CardContent>
            </Card>
          </button>
        </CarouselItem>
      {/each}
    </CarouselContent>
    <aside class={ATTENDANTS.controls()}>
      <CarouselPrevious aria-label="Participant précédent" class={ATTENDANTS.control()} />
      <CarouselNext aria-label="Participant suivant" class={ATTENDANTS.control()} />
    </aside>
  </Carousel>
</section>
