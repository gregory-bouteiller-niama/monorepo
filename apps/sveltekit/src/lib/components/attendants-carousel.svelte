<script lang="ts">
  import type { Attendants } from "@niama/domain/functions/attendants";
  import { ATTENDANT, ATTENDANTS, AUTOPLAY, ROTATIONS } from "@niama/ui/shared/attendants/carousel";
  import { Button } from "@niama/ui/svelte/button";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@niama/ui/svelte/card";
  import Autoplay from "embla-carousel-autoplay";
  import DisciplinesBadge from "$lib/components/disciplines-badge.svelte";
  import Image from "$lib/components/image.svelte";
  import Carousel from "$lib/components/ui/carousel/carousel.svelte";
  import CarouselContent from "$lib/components/ui/carousel/carousel-content.svelte";
  import CarouselItem from "$lib/components/ui/carousel/carousel-item.svelte";
  import CarouselNext from "$lib/components/ui/carousel/carousel-next.svelte";
  import CarouselPrevious from "$lib/components/ui/carousel/carousel-previous.svelte";

  let { autoplay = AUTOPLAY / 1000, items }: { autoplay?: number; items: Attendants["Entity"][] } = $props();
  let flippedItems = $state<Record<string, boolean>>({});

  const plugins = $derived.by(() => {
    if (!Number.isFinite(autoplay) || autoplay <= 0) return [];
    return [Autoplay({ delay: autoplay * 1000, stopOnInteraction: false })];
  });
</script>

{#if items.length > 0}
  <section class={ATTENDANTS.base()}>
    <Carousel class={ATTENDANTS.carousel()} opts={{ loop: true }} {plugins}>
      <CarouselContent viewportClass={ATTENDANTS.viewport()}>
        {#each items as item, index (item.name)}
          <CarouselItem class={ATTENDANTS.item()}>
            <button
              aria-label={`Afficher la fiche de ${item.name}`}
              aria-pressed={flippedItems[item.name] === true}
              class={ATTENDANT.base({ className: ROTATIONS[index] })}
              data-flipped={flippedItems[item.name] === true}
              onclick={() => {
                flippedItems[item.name] = !(flippedItems[item.name] === true);
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
                    <Button variant="secondary">
                      En savoir plus
                      <span class={ATTENDANT.icon()}></span>
                    </Button>
                  </div>
                  <Image {...item.image} sizes="(min-width: 640px) 420px, 100vw" widths={[420, 840]} />
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
{/if}
