import { cn } from "@niama/ui/lib/utils";
import { initializeSky, SKY, SKY_ORBITS } from "@niama/ui/shared/sky";
import { onSettled } from "solid-js";

export function Sky(props: SkyProps) {
  const { class: className, ...rest } = props;
  let starsRef!: HTMLDivElement;

  onSettled(() => {
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
