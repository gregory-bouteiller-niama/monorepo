import { createStore } from "@tanstack/store";

// CONSTS ----------------------------------------------------------------------------------------------------------------------------------
const HIDDEN_STAIN_STYLE = { opacity: "0" } as const;

// STORE -----------------------------------------------------------------------------------------------------------------------------------
export const headerStore = createStore<HeaderState>({ active: undefined, hovered: undefined, navLinkStyles: new Map() });

// METHODS ---------------------------------------------------------------------------------------------------------------------------------
export const selectStainStyle = ({ active, hovered, navLinkStyles }: HeaderState) =>
	hovered ? navLinkStyles.get(hovered) : active ? navLinkStyles.get(active) : HIDDEN_STAIN_STYLE;

export const setActive = (active?: string) => headerStore.setState((state) => ({ ...state, active }));
export const setHovered = (hovered?: string) => headerStore.setState((state) => ({ ...state, hovered }));

export const setNavLinkStyle = (key: string, element: HTMLElement) =>
	headerStore.setState((state) => {
		const navLinkStyles = new Map(state.navLinkStyles);
		navLinkStyles.set(key, stainStyleFromElement(element));
		return { ...state, navLinkStyles };
	});

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
