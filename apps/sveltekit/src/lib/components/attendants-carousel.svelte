<script lang="ts">
  import type { Attendants } from "@niama/domain/functions/attendants";
  import { ATTENDANTS, AUTOPLAY, getAttendantsHeroRotation } from "@niama/ui/shared/attendants/carousel";
  import type { EmblaCarouselType } from "embla-carousel";
  import Autoplay from "embla-carousel-autoplay";
  import DisciplinesBadge from "$lib/components/disciplines-badge.svelte";
  import Carousel from "$lib/components/ui/carousel/carousel.svelte";
  import CarouselContent from "$lib/components/ui/carousel/carousel-content.svelte";
  import CarouselItem from "$lib/components/ui/carousel/carousel-item.svelte";
  import CarouselNext from "$lib/components/ui/carousel/carousel-next.svelte";
  import CarouselPrevious from "$lib/components/ui/carousel/carousel-previous.svelte";

  let { autoplay = AUTOPLAY / 1000, items }: { autoplay?: number; items: Attendants["Entity"][] } = $props();
  let emblaApi = $state<EmblaCarouselType | null>(null);
  let flippedIndex = $state<number | null>(null);
  let selectedIndex = $state(0);

  const plugins = $derived.by(() => {
    if (!Number.isFinite(autoplay) || autoplay <= 0) return [];
    return [Autoplay({ delay: autoplay * 1000, stopOnInteraction: false })];
  });

  $effect(() => {
    if (!emblaApi) {
      return;
    }

    const currentApi = emblaApi;

    const syncSelectedIndex = () => {
      selectedIndex = currentApi.selectedScrollSnap();
    };

    syncSelectedIndex();
    currentApi.on("reInit", syncSelectedIndex);
    currentApi.on("select", syncSelectedIndex);

    return () => {
      currentApi.off("reInit", syncSelectedIndex);
      currentApi.off("select", syncSelectedIndex);
    };
  });
</script>

{#if items.length > 0}
  <section class={ATTENDANTS.base()}>
    <Carousel bind:api={emblaApi} class={ATTENDANTS.carousel()} opts={{ align: "center", containScroll: false, loop: true }} {plugins}>
      <CarouselContent class="-ml-4" viewportClass={ATTENDANTS.heroViewport()}>
        {#each items as item, index (item.image.alt)}
          <CarouselItem class={ATTENDANTS.heroItem()}>
            <button
              aria-label={`Afficher la fiche de ${item.name}`}
              aria-pressed={flippedIndex === index}
              class={ATTENDANTS.heroCard()}
              data-flipped={flippedIndex === index}
              onclick={() => {
                flippedIndex = flippedIndex === index ? null : index;
              }}
              type="button"
            >
              <div
                class={ATTENDANTS.heroInner()}
                style={`--attendants-rotation:${selectedIndex === index ? 0 : getAttendantsHeroRotation(item.name)}deg;--attendants-y-rotation:${flippedIndex === index ? "180deg" : "0deg"};`}
              >
                <article class={`${ATTENDANTS.heroFigure()} ${ATTENDANTS.heroFace()}`}>
                  <img
                    alt={item.image.alt}
                    class={ATTENDANTS.heroImage()}
                    decoding="async"
                    fetchpriority="high"
                    height={item.image.height}
                    loading="eager"
                    src={item.image.src}
                    style:background={item.image.background}
                    width={item.image.width}
                  >
                  <div class={ATTENDANTS.heroOverlay()}></div>
                  <div class={ATTENDANTS.heroHoverOverlay()}></div>
                  <div class={ATTENDANTS.heroHoverIcon()}>En savoir plus...</div>
                  <div class={ATTENDANTS.heroContent()}>
                    <h3 class={ATTENDANTS.heroName()}>{item.name}</h3>
                    <div class={ATTENDANTS.heroDisciplines()}>
                      {#each item.disciplines as discipline (discipline.slug)}
                        <DisciplinesBadge class={ATTENDANTS.heroBadge()} slug={discipline.slug} />
                      {/each}
                    </div>
                  </div>
                </article>
                <div class={ATTENDANTS.heroBackFace()}>
                  <div class={ATTENDANTS.heroBackBody()}>
                    <div class={ATTENDANTS.heroDescription()}>
                      {#each item.description as paragraph (paragraph)}
                        <p>{paragraph}</p>
                      {/each}
                    </div>
                  </div>
                  <div class={ATTENDANTS.heroBackFooter()}>
                    <h3 class={ATTENDANTS.heroName()}>{item.name}</h3>
                    <div class={ATTENDANTS.heroDisciplines()}>
                      {#each item.disciplines as discipline (discipline.slug)}
                        <DisciplinesBadge class={ATTENDANTS.heroBadge()} slug={discipline.slug} />
                      {/each}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </CarouselItem>
        {/each}
      </CarouselContent>
      <div class={ATTENDANTS.actions()}>
        <CarouselPrevious aria-label="Participant précédent" class={ATTENDANTS.control()} size="icon-sm" />
        <CarouselNext aria-label="Participant suivant" class={ATTENDANTS.control()} size="icon-sm" />
      </div>
    </Carousel>
  </section>
{/if}
