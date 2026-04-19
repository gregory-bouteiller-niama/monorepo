import { tv } from "tailwind-variants";

const STYLES = tv({
  base: "container pointer-events-none fixed bottom-4 mx-auto flex w-full justify-between self-center rounded-full px-4 py-2",
  slots: {
    disclaimer: "pointer-events-auto backdrop-blur-xl",
    social: "pointer-events-auto backdrop-blur-xl",
    socials: "flex items-center gap-2",
  },
});

export const THE_FOOTER = STYLES();
