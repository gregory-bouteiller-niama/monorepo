<script lang="ts" module>
  import { transformBaseImageProps } from "@unpic/core/base";
  import { transform } from "unpic/providers/imagekit";

  export const createImageProps = ({
    background,
    height,
    sizes,
    src,
    width,
    widths,
  }: {
    background: string;
    height: number;
    sizes: string;
    src: string;
    width: number;
    widths: number[];
  }) =>
    transformBaseImageProps({
      background,
      breakpoints: widths,
      height,
      layout: "constrained",
      objectFit: "cover",
      operations: { f: "avif", q: 80 },
      sizes,
      src,
      transformer: transform,
      width,
    });
</script>

<script lang="ts">
  import { cn } from "@niama/ui/lib/utils";

  let {
    alt,
    background,
    class: className = "",
    height,
    loading = "lazy",
    sizes,
    src,
    width,
    widths,
  }: {
    alt: string;
    background: string;
    class?: string;
    height: number;
    loading?: "eager" | "lazy";
    sizes: string;
    src: string;
    width: number;
    widths: number[];
  } = $props();

  const responsiveImage = $derived(
    createImageProps({
      background,
      height,
      sizes,
      src,
      width,
      widths,
    })
  );
  const imageSizes = $derived(typeof responsiveImage.sizes === "string" ? responsiveImage.sizes : sizes);
  const imageSrc = $derived(typeof responsiveImage.src === "string" ? responsiveImage.src : src);
  const imageSrcSet = $derived(typeof responsiveImage.srcset === "string" ? responsiveImage.srcset : undefined);
</script>

<img
  alt={String(alt)}
  class={cn(className)}
  decoding="async"
  height={responsiveImage.height}
  {loading}
  sizes={imageSizes}
  src={imageSrc}
  srcset={imageSrcSet}
  style:background={background}
  width={responsiveImage.width}
>
