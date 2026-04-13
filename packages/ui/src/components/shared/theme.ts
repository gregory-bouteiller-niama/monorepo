import { createStore } from "@tanstack/store";
import { z } from "zod/mini";

// CONSTS ----------------------------------------------------------------------------------------------------------------------------------
const THEME_STORAGE_KEY = "ui-theme";

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
export const zUserTheme = z.catch(z.enum(["light", "dark", "system"]), "system");
export type UserTheme = z.infer<typeof zUserTheme>;

// STORE -----------------------------------------------------------------------------------------------------------------------------------
const themeStore = createStore<AppTheme>("light");

export const bindThemeApplication = () => {
	const { unsubscribe } = themeStore.subscribe((theme) => {
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(theme);
		document.documentElement.style.colorScheme = theme;
	});
	return unsubscribe;
};

// LOCAL STORAGE ---------------------------------------------------------------------------------------------------------------------------
export const getStoredTheme = (): UserTheme => {
	try {
		return zUserTheme.parse(localStorage.getItem(THEME_STORAGE_KEY));
	} catch {
		return "system";
	}
};

export const setStoredTheme = (theme: UserTheme): UserTheme => {
	const validatedTheme = zUserTheme.parse(theme);
	try {
		localStorage.setItem(THEME_STORAGE_KEY, validatedTheme);
	} catch {}
	return validatedTheme;
};

export const watchThemeStorage = () => {
	const handleStorage = ({ key }: StorageEvent) => {
		if (key === THEME_STORAGE_KEY) applyTheme();
	};
	window.addEventListener("storage", handleStorage);
	return () => window.removeEventListener("storage", handleStorage);
};

// SYSTEM ----------------------------------------------------------------------------------------------------------------------------------
export const watchSystemTheme = () => {
	const mediaQuery = getSystemQuery();
	const handleChange = () => {
		if (getStoredTheme() === "system") applyTheme();
	};
	mediaQuery.addEventListener("change", handleChange);
	return () => mediaQuery.removeEventListener("change", handleChange);
};

const getSystemQuery = () => matchMedia("(prefers-color-scheme: dark)");
const getSystemTheme = (): AppTheme => (getSystemQuery().matches ? "dark" : "light");

// UTILS -----------------------------------------------------------------------------------------------------------------------------------
export const applyTheme = (userTheme?: UserTheme) => {
	if (userTheme) setStoredTheme(userTheme);
	const storedTheme = userTheme ?? getStoredTheme();
	const theme = storedTheme === "system" ? getSystemTheme() : storedTheme;
	themeStore.setState(() => theme);
};

export const toggleThemeWithTransition = (trigger: HTMLElement | null) => {
	const nextTheme = themeStore.state === "light" ? "dark" : "light";
	if (typeof document.startViewTransition !== "function" || !trigger) return applyTheme(nextTheme);

	const { height, left, top, width } = trigger.getBoundingClientRect();
	const x = left + width / 2;
	const y = top + height / 2;
	const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
	const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
	const maxRadius = Math.hypot(Math.max(x, viewportWidth - x), Math.max(y, viewportHeight - y));

	const transition = document.startViewTransition(() => applyTheme(nextTheme));
	void transition.ready.then(() => {
		document.documentElement.animate(
			{ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`] },
			{ duration: 400, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" },
		);
	});
};

// SCRIPT ----------------------------------------------------------------------------------------------------------------------------------
const themeScriptFn = () => {
	const systemTheme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	const setTheme = (theme: string) => {
		document.documentElement.classList.add(theme);
		document.documentElement.style.colorScheme = theme;
	};
	try {
		const storedTheme = localStorage.getItem("ui-theme") ?? "system";
		const userTheme = ["light", "dark", "system"].includes(storedTheme) ? storedTheme : "system";
		setTheme(userTheme === "system" ? systemTheme : userTheme);
	} catch {
		setTheme(systemTheme);
	}
};
export const themeScript = `(${themeScriptFn.toString()})();`;

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type AppTheme = Exclude<UserTheme, "system">;
