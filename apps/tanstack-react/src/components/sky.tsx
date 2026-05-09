import { cn } from "@niama/ui/lib/utils";
import { initializeSky, SKY, SKY_ORBITS } from "@niama/ui/sky";
import { useEffect, useRef } from "react";

export type SkyProps = React.ComponentProps<"div">;

export function Sky({ className, ...props }: SkyProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => (ref.current ? initializeSky(ref.current) : undefined), []);

  return (
    <div className={cn(SKY.base(), className)}>
      <div className={SKY.orbits()}>
        {SKY_ORBITS.map((orbit) => (
          <div className={SKY.orbit()} key={orbit}>
            <div className={SKY.planet()} />
          </div>
        ))}
      </div>
      <div className={SKY.stars()} ref={ref} {...props}>
        <canvas className={SKY.canvas()} />
      </div>
    </div>
  );
}
