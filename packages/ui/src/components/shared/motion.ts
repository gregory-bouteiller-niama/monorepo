export const getReducedMotionQuery = () => matchMedia("(prefers-reduced-motion: reduce)");
export const prefersReducedMotion = () => getReducedMotionQuery().matches;

export const bindReducedMotion = (listener: (event: MediaQueryListEvent) => void) => {
  const reducedMotion = getReducedMotionQuery();
  reducedMotion.addEventListener("change", listener);
  return () => reducedMotion.removeEventListener("change", listener);
};
