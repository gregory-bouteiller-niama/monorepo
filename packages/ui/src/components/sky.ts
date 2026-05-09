import { cva } from "class-variance-authority";
import { bindReducedMotion, prefersReducedMotion } from "./motion";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const SKY = {
  base: cva("relative block size-full"),
  canvas: cva("size-full"),
  orbit: cva(`group absolute animate-spin rounded-full border border-foreground/5 
  nth-1:size-1/4 nth-1:animation-duration-[60s] 
  nth-2:size-1/2 nth-2:animation-duration-[120s] nth-2:direction-reverse
  nth-3:size-3/4 nth-3:animation-duration-[110s]
  nth-4:size-11/12 nth-4:animation-duration-[90s] nth-4:direction-reverse
  `),
  orbits: cva(`pointer-events-none fixed top-1/2 left-1/2 -z-10 flex size-svw min-h-[1000px] min-w-[1000px] -translate-1/2
    items-center justify-center`),
  planet: cva(`absolute top-0 left-1/2 size-2.5 -translate-1/2 rounded-full 
    dark:bg-white
    group-nth-1:bg-yogart group-nth-1:shadow-[0_0_10px_2px_var(--yogart)]
    group-nth-2:bg-anima group-nth-2:shadow-[0_0_10px_2px_var(--anima)]
    group-nth-3:bg-animus group-nth-3:shadow-[0_0_10px_2px_var(--animus)]
    group-nth-4:bg-astro group-nth-4:shadow-[0_0_10px_2px_var(--astro)]
    `),
  stars: cva("absolute inset-0 size-full"),
};

// CONSTS ----------------------------------------------------------------------------------------------------------------------------------
export const SKY_ORBITS = [0, 1, 2, 3] as const;

const GLOW_INTENSITY = 15;
const GRAVITY_STRENGTH = 75;
const MOUSE_INFLUENCE = 100;
const MOVEMENT_SPEED = 0.3;
const STARS_COUNT = 75;
const STARS_OPACITY = 0.75;
const STARS_SIZE = 2;

// HELPERS ---------------------------------------------------------------------------------------------------------------------------------
const syncGlow = (star: Particle, targetGlow: number) => {
  const easing = targetGlow > star.glowMultiplier ? 0.15 : 0.08;
  star.glowMultiplier = Math.max(1, star.glowMultiplier + (targetGlow - star.glowMultiplier) * easing);
};

const applyMouseForce = (star: Particle, mouse: SkyState["mouse"]) => {
  const dx = mouse.x - star.x;
  const dy = mouse.y - star.y;
  const distance = Math.hypot(dx, dy);

  if (distance >= MOUSE_INFLUENCE || distance <= 0) {
    star.opacity = Math.max(star.baseOpacity * 0.3, star.opacity - 0.02);
    syncGlow(star, 1);
    return;
  }

  const force = (MOUSE_INFLUENCE - distance) / MOUSE_INFLUENCE;
  const nx = dx / distance;
  const ny = dy / distance;
  const gravity = force * (GRAVITY_STRENGTH * 0.001);

  star.vx += nx * gravity;
  star.vy += ny * gravity;
  star.opacity = Math.min(1, star.baseOpacity + force * 0.4);
  syncGlow(star, 1 + force * 2);
};

const applyStarsInteraction = (star: Particle, starIndex: number, { stars }: StarContext) => {
  for (let otherIndex = starIndex + 1; otherIndex < stars.length; otherIndex++) {
    const other = stars[otherIndex];
    const dx = other.x - star.x;
    const dy = other.y - star.y;
    const distance = Math.hypot(dx, dy);
    const minimumDistance = star.size + other.size + 5;

    if (distance >= minimumDistance || distance <= 0) continue;

    const nx = dx / distance;
    const ny = dy / distance;
    const rvx = star.vx - other.vx;
    const rvy = star.vy - other.vy;
    const speed = rvx * nx + rvy * ny;
    if (speed < 0) continue;

    const impulse = (2 * speed) / (star.mass + other.mass);
    star.vx -= impulse * other.mass * nx;
    star.vy -= impulse * other.mass * ny;
    other.vx += impulse * star.mass * nx;
    other.vy += impulse * star.mass * ny;

    const overlap = minimumDistance - distance;
    const sx = nx * overlap * 0.5;
    const sy = ny * overlap * 0.5;
    star.x -= sx;
    star.y -= sy;
    other.x += sx;
    other.y += sy;
  }
};

const advanceStar = (star: Particle, { height, width }: Pick<StarContext, "height" | "width">) => {
  star.x += star.vx;
  star.y += star.vy;
  star.vx += (Math.random() - 0.5) * 0.001;
  star.vy += (Math.random() - 0.5) * 0.001;
  star.vx *= 0.999;
  star.vy *= 0.999;

  if (star.x < 0) star.x = width;
  if (star.x > width) star.x = 0;
  if (star.y < 0) star.y = height;
  if (star.y > height) star.y = 0;
};

// INIT ------------------------------------------------------------------------------------------------------------------------------------
export const initializeSky = (container: HTMLElement) => {
  const canvas = container.querySelector("canvas");
  if (!(canvas instanceof HTMLCanvasElement)) throw new Error("Sky canvas element not found");

  const context = canvas.getContext("2d");
  if (!context) return () => undefined;

  const state: SkyState = { animationId: 0, dpr: 1, mouse: { x: 0, y: 0 }, size: { height: 600, width: 800 }, stars: [] };

  const readColor = () => getComputedStyle(container).color || "#ffffff";

  const initStars = (width: number, height: number) => {
    state.stars = Array.from({ length: STARS_COUNT }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = MOVEMENT_SPEED * (0.5 + Math.random() * 0.5);

      return {
        baseOpacity: STARS_OPACITY,
        glowMultiplier: 1,
        glowVelocity: 0,
        mass: Math.random() * 0.5 + 0.5,
        opacity: STARS_OPACITY,
        size: Math.random() * STARS_SIZE + 1,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        x: Math.random() * width,
        y: Math.random() * height,
      };
    });
  };

  const resizeCanvas = () => {
    const rect = container.getBoundingClientRect();

    state.dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    canvas.width = Math.max(1, Math.floor(rect.width * state.dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * state.dpr));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    state.size = { height: rect.height, width: rect.width };

    initStars(rect.width, rect.height);
    drawStars();
  };

  const updateStars = () => {
    const starContext: StarContext = { ...state.size, stars: state.stars };

    for (const [starIndex, star] of state.stars.entries()) {
      applyMouseForce(star, state.mouse);
      applyStarsInteraction(star, starIndex, starContext);
      advanceStar(star, starContext);
    }
  };

  const drawStars = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const color = readColor();

    for (const star of state.stars) {
      context.save();
      context.shadowBlur = GLOW_INTENSITY * star.glowMultiplier * 2;
      context.shadowColor = color;
      context.globalAlpha = star.opacity;
      context.fillStyle = color;
      context.beginPath();
      context.arc(star.x * state.dpr, star.y * state.dpr, star.size * state.dpr, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }
  };

  const animate = () => {
    updateStars();
    drawStars();
    state.animationId = window.requestAnimationFrame(animate);
  };

  const stopAnimation = () => {
    if (!state.animationId) return;
    window.cancelAnimationFrame(state.animationId);
    state.animationId = 0;
  };

  const startAnimation = () => {
    if (state.animationId || prefersReducedMotion() || document.visibilityState !== "visible") return;
    state.animationId = window.requestAnimationFrame(animate);
  };

  const updateMouse = (clientX: number, clientY: number) => {
    const rect = canvas.getBoundingClientRect();
    state.mouse.x = clientX - rect.left;
    state.mouse.y = clientY - rect.top;
  };

  const handleMouseMove = (event: MouseEvent) => updateMouse(event.clientX, event.clientY);
  const handleTouchMove = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (!touch) return;
    updateMouse(touch.clientX, touch.clientY);
  };
  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") startAnimation();
    else stopAnimation();
  };
  const handleReducedMotionChange = () => {
    if (prefersReducedMotion()) stopAnimation();
    else startAnimation();
  };

  resizeCanvas();
  drawStars();
  startAnimation();

  const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resizeCanvas);
  resizeObserver?.observe(container);
  const unbindReducedMotion = bindReducedMotion(handleReducedMotionChange);

  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("mousemove", handleMouseMove, { passive: true });
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("touchmove", handleTouchMove, { passive: true });

  return () => {
    stopAnimation();
    resizeObserver?.disconnect();
    unbindReducedMotion();
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("resize", resizeCanvas);
    window.removeEventListener("touchmove", handleTouchMove);
  };
};

// TYPES ----------------------------------------------------------------------------------------------------------------------------------
type Particle = {
  baseOpacity: number;
  glowMultiplier: number;
  glowVelocity: number;
  mass: number;
  opacity: number;
  size: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

type SkyState = {
  animationId: number;
  dpr: number;
  mouse: { x: number; y: number };
  size: { height: number; width: number };
  stars: Particle[];
};

type StarContext = {
  height: number;
  stars: Particle[];
  width: number;
};
