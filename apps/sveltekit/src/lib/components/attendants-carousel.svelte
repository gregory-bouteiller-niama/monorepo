<script lang="ts">
  import type { Attendants } from "@niama/domain/functions/attendants";
  import { cn } from "@niama/ui/lib/utils";
  import {
    ATTENDANTS,
    applyAttendantsImageStyles,
    formatAttendantsImageStyle,
    getAttendantsInitialImageStyle,
  } from "@niama/ui/shared/attendants/carousel";
  import { GLOW } from "@niama/ui/shared/glow";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@niama/ui/svelte/card";
  import type { EmblaCarouselType } from "embla-carousel";
  import Autoplay from "embla-carousel-autoplay";
  import DisciplinesBadge from "$lib/components/disciplines-badge.svelte";
  import Carousel from "$lib/components/ui/carousel/carousel.svelte";
  import CarouselContent from "$lib/components/ui/carousel/carousel-content.svelte";
  import CarouselItem from "$lib/components/ui/carousel/carousel-item.svelte";
  import CarouselNext from "$lib/components/ui/carousel/carousel-next.svelte";
  import CarouselPrevious from "$lib/components/ui/carousel/carousel-previous.svelte";

  import "@niama/ui/styles/attendants/carousel.css";

  let { autoplay = 10, items }: { autoplay?: number; items: Attendants["Entity"][] } = $props();

  let emblaApi = $state<EmblaCarouselType | null>(null);
  let imageElements = $state<Array<HTMLImageElement | null>>([]);

  const plugins = $derived.by(() => {
    if (!Number.isFinite(autoplay) || autoplay <= 0) return [];
    return [Autoplay({ delay: autoplay * 1000, stopOnInteraction: true })];
  });

  $effect(() => {
    if (!emblaApi) {
      return;
    }

    const currentApi = emblaApi;

    const syncImages = () => {
      applyAttendantsImageStyles(currentApi, imageElements);
    };

    syncImages();
    currentApi.on("reInit", syncImages);
    currentApi.on("scroll", syncImages);
    currentApi.on("select", syncImages);

    return () => {
      currentApi.off("reInit", syncImages);
      currentApi.off("scroll", syncImages);
      currentApi.off("select", syncImages);
    };
  });
</script>

{#if items.length > 0}
  <section class={ATTENDANTS.base()}>
    <aside class={ATTENDANTS.aside()}>
      {#each items as item, index (item.image.alt)}
        <img
          alt={item.image.alt}
          bind:this={imageElements[index]}
          class={ATTENDANTS.image()}
          data-index={index}
          decoding="async"
          fetchpriority={index === 0 ? "high" : "auto"}
          height={item.image.height}
          loading={index === 0 ? "eager" : "lazy"}
          src={item.image.src}
          style={formatAttendantsImageStyle(getAttendantsInitialImageStyle(index, 0, items.length))}
          style:background={item.image.background}
          width={item.image.width}
        >
      {/each}
    </aside>
    <main class={ATTENDANTS.main()}>
      <Carousel bind:api={emblaApi} class={ATTENDANTS.carousel()} opts={{ align: "start", loop: true }} {plugins}>
        <CarouselContent class="-ml-0">
          {#each items as item (item.image.alt)}
            <CarouselItem class="pl-0">
              <Card class={cn(GLOW(), ATTENDANTS.card())} data-glow>
                <CardHeader>
                  <CardTitle class={ATTENDANTS.name()}>{item.name}</CardTitle>
                  <CardDescription class={ATTENDANTS.disciplines()}>
                    {#each item.disciplines as discipline (discipline.slug)}
                      <DisciplinesBadge class={ATTENDANTS.badge()} slug={discipline.slug} />
                    {/each}
                  </CardDescription>
                </CardHeader>
                <CardContent class={ATTENDANTS.description()}>
                  {#each item.description as paragraph (paragraph)}
                    <p>{paragraph}</p>
                  {/each}
                </CardContent>
              </Card>
            </CarouselItem>
          {/each}
        </CarouselContent>
        <div class={ATTENDANTS.actions()}>
          <CarouselPrevious aria-label="Participant précédent" class={ATTENDANTS.control()} size="icon-sm" />
          <CarouselNext aria-label="Participant suivant" class={ATTENDANTS.control()} size="icon-sm" />
        </div>
      </Carousel>
    </main>
  </section>
{/if}
