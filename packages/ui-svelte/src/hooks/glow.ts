import { hideGlow, initializeGlow, moveGlowTo, showGlowAt } from "@niama/ui/glow";
import type { Attachment } from "svelte/attachments";

export function glow(): Attachment<HTMLElement> {
  return (el) => {
    initializeGlow(el);

    const handlePointerMove = ({ clientX, clientY }: PointerEvent) => moveGlowTo(el, clientX, clientY);
    const handlePointerEnter = ({ clientX, clientY }: PointerEvent) => showGlowAt(el, clientX, clientY);
    const handlePointerLeave = () => hideGlow(el);

    el.addEventListener("pointermove", handlePointerMove);
    el.addEventListener("pointerenter", handlePointerEnter);
    el.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerenter", handlePointerEnter);
      el.removeEventListener("pointerleave", handlePointerLeave);
    };
  };
}
