import { hideGlow, initializeGlow, moveGlowTo, showGlowAt } from "@niama/ui/glow";
import { useEffect, useEffectEvent, useRef } from "react";

export const useGlow = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const onPointerMove = useEffectEvent(({ clientX, clientY }: React.PointerEvent) => moveGlowTo(ref.current, clientX, clientY));
  const onPointerEnter = useEffectEvent(({ clientX, clientY }: React.PointerEvent) => showGlowAt(ref.current, clientX, clientY));
  const onPointerLeave = useEffectEvent(() => hideGlow(ref.current));
  useEffect(() => initializeGlow(ref.current), []);
  return { ref, props: { onPointerEnter, onPointerLeave, onPointerMove } };
};
