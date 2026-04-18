import { createStore } from "@tanstack/store";

// CONSTS ----------------------------------------------------------------------------------------------------------------------------------
const HIDDEN_STAIN_STYLE = { opacity: "0" } as const;

// STORE -----------------------------------------------------------------------------------------------------------------------------------
export const headerStore = createStore(
  { active: undefined, hovered: undefined, navLinkStyles: new Map() } as HeaderState,
  ({ setState }) => ({
    setActive: (active?: string) => setState((prev) => ({ ...prev, active })),
    setHovered: (hovered?: string) => setState((prev) => ({ ...prev, hovered })),
    setNavLinkStyle: (key: string, element: HTMLElement) =>
      setState((prev) => {
        const navLinkStyles = new Map(prev.navLinkStyles);
        navLinkStyles.set(key, stainStyleFromElement(element));
        return { ...prev, navLinkStyles };
      }),
  })
);

// METHODS ---------------------------------------------------------------------------------------------------------------------------------
export const selectStainStyle = ({ active, hovered, navLinkStyles }: HeaderState) => {
  if (hovered) return navLinkStyles.get(hovered);
  return active ? navLinkStyles.get(active) : HIDDEN_STAIN_STYLE;
};

// UTILS -----------------------------------------------------------------------------------------------------------------------------------
const stainStyleFromElement = ({ offsetHeight, offsetLeft, offsetTop, offsetWidth }: HTMLElement) => ({
  height: `${offsetHeight}px`,
  opacity: "1",
  transform: `translate(${offsetLeft}px, ${offsetTop}px)`,
  width: `${offsetWidth}px`,
});

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type BoundsStyle = Required<Pick<CSSStyleDeclaration, "height" | "opacity" | "transform" | "width">>;
export type HeaderState = { active?: string; hovered?: string; navLinkStyles: Map<string, BoundsStyle> };
