<script lang="ts" module>
  import type { Snippet } from "svelte";
  import { setCarouselCloneCtx } from "./context";

  export type CarouselClonesProps = { children?: Snippet };
</script>

<script lang="ts">
  let { children }: CarouselClonesProps = $props();

  setCarouselCloneCtx(true);
</script>

{@render children?.()}
