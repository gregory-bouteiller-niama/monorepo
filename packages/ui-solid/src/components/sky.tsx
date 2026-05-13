import { initializeSky, SKY, SKY_ORBITS } from "@niama/ui/sky";
import { cn } from "@niama/ui-solid/lib/utils";
import { onMount } from "solid-js";

export function Sky(props: SkyProps) {
  const { class: className, ...rest } = props;
  // biome-ignore lint/suspicious/noUnassignedVariables: false positive in solid
  let starsRef!: HTMLDivElement;

  onMount(() => {
    if (starsRef) return initializeSky(starsRef);
  });

  return (
    <div class={cn(SKY.base(), className)}>
      <div class={SKY.orbits()}>
        {SKY_ORBITS.map((orbit) => (
          <div class={SKY.orbit()} data-orbit={orbit}>
            <div class={SKY.planet()} />
          </div>
        ))}
      </div>
      <div class={SKY.stars()} ref={starsRef} {...rest}>
        <canvas class={SKY.canvas()} />
      </div>
    </div>
  );
}

export type SkyProps = {
  class?: string;
};
