import { applyTheme, bindThemeApplication, watchSystemTheme, watchThemeStorage } from "./theme";

export const initialize = () => {
	const cleanScrolled = initializeScrolled();
	const cleanTheme = initializeTheme();

	return () => {
		cleanScrolled();
		cleanTheme();
	};
};

// SCROLLED --------------------------------------------------------------------------------------------------------------------------------
const SCROLLED_THRESHOLD = 235;
let rafId = Number.NaN;

const queueApplyScrolled = () => {
	if (Number.isNaN(rafId)) rafId = window.requestAnimationFrame(applyScrolled);
};

const applyScrolled = () => {
	rafId = Number.NaN;
	document.body.dataset.scrolled = (window.scrollY > SCROLLED_THRESHOLD).toString();
};

const initializeScrolled = () => {
	applyScrolled();
	window.addEventListener("scroll", queueApplyScrolled, { passive: true });
	window.addEventListener("resize", queueApplyScrolled, { passive: true });

	return () => {
		window.removeEventListener("scroll", queueApplyScrolled);
		window.removeEventListener("resize", queueApplyScrolled);

		if (!Number.isNaN(rafId)) {
			window.cancelAnimationFrame(rafId);
			rafId = Number.NaN;
		}
	};
};

// THEME -----------------------------------------------------------------------------------------------------------------------------------
const initializeTheme = () => {
	const cleaners = [watchSystemTheme(), watchThemeStorage(), bindThemeApplication()];
	applyTheme();
	return () => cleaners.map((cleaner) => cleaner());
};
