<script lang="ts">
  import { cn } from "@niama/ui/lib/utils";
  import { SKY } from "@niama/ui/shared/sky";
  import { onMount } from "svelte";

  type Particle = {
    baseOpacity: number;
    glowMultiplier: number;
    mass: number;
    opacity: number;
    size: number;
    vx: number;
    vy: number;
    x: number;
    y: number;
  };

  let { class: className = "" }: { class?: string } = $props();

  let container: HTMLDivElement | null = null;
  let canvas: HTMLCanvasElement | null = null;

  onMount(() => {
    if (!(container instanceof HTMLElement && canvas instanceof HTMLCanvasElement)) {
      return;
    }

    const containerElement = container;
    const canvasElement = canvas;

    const starsCount = 75;
    const starsSize = 2;
    const starsOpacity = 0.75;
    const glowIntensity = 15;
    const movementSpeed = 0.3;
    const mouseInfluence = 100;
    const gravityStrength = 75;

    const state = {
      animationId: 0,
      dpr: 1,
      mouse: { x: 0, y: 0 },
      size: { height: 600, width: 800 },
      stars: [] as Particle[],
    };

    const readColor = () => getComputedStyle(containerElement).color || "#ffffff";

    const initStars = (width: number, height: number) => {
      state.stars = Array.from({ length: starsCount }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = movementSpeed * (0.5 + Math.random() * 0.5);

        return {
          baseOpacity: starsOpacity,
          glowMultiplier: 1,
          mass: Math.random() * 0.5 + 0.5,
          opacity: starsOpacity,
          size: Math.random() * starsSize + 1,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          x: Math.random() * width,
          y: Math.random() * height,
        };
      });
    };

    const resizeCanvas = () => {
      const rect = containerElement.getBoundingClientRect();

      state.dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      canvasElement.width = Math.max(1, Math.floor(rect.width * state.dpr));
      canvasElement.height = Math.max(1, Math.floor(rect.height * state.dpr));
      canvasElement.style.width = `${rect.width}px`;
      canvasElement.style.height = `${rect.height}px`;
      state.size = { height: rect.height, width: rect.width };

      initStars(rect.width, rect.height);
    };

    const updateStars = () => {
      const { height, width } = state.size;

      for (const star of state.stars) {
        const dx = state.mouse.x - star.x;
        const dy = state.mouse.y - star.y;
        const distance = Math.hypot(dx, dy);

        if (distance < mouseInfluence && distance > 0) {
          const force = (mouseInfluence - distance) / mouseInfluence;
          const gravity = force * (gravityStrength * 0.001);

          star.vx += (dx / distance) * gravity;
          star.vy += (dy / distance) * gravity;
          star.opacity = Math.min(1, star.baseOpacity + force * 0.4);
          star.glowMultiplier += (1 + force * 2 - star.glowMultiplier) * 0.15;
        } else {
          star.opacity = Math.max(star.baseOpacity * 0.3, star.opacity - 0.02);
          star.glowMultiplier = Math.max(1, star.glowMultiplier + (1 - star.glowMultiplier) * 0.08);
        }

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
      }
    };

    const drawStars = () => {
      const context = canvasElement.getContext("2d");
      if (!context) return;

      context.clearRect(0, 0, canvasElement.width, canvasElement.height);
      const color = readColor();

      for (const star of state.stars) {
        context.save();
        context.shadowBlur = glowIntensity * star.glowMultiplier * 2;
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

    const updateMouse = (clientX: number, clientY: number) => {
      const rect = canvasElement.getBoundingClientRect();
      state.mouse.x = clientX - rect.left;
      state.mouse.y = clientY - rect.top;
    };

    const handleMouseMove = (event: MouseEvent) => updateMouse(event.clientX, event.clientY);
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      updateMouse(touch.clientX, touch.clientY);
    };

    resizeCanvas();
    state.animationId = window.requestAnimationFrame(animate);

    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resizeCanvas);
    resizeObserver?.observe(containerElement);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      if (state.animationId) window.cancelAnimationFrame(state.animationId);
      resizeObserver?.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  });
</script>

<div aria-hidden="true" bind:this={container} class={cn(SKY.base(), className)}>
  <div class={SKY.orbits()}>
    <div class={SKY.orbit()}><span class={SKY.planet()}></span></div>
    <div class={SKY.orbit()}><span class={SKY.planet()}></span></div>
    <div class={SKY.orbit()}><span class={SKY.planet()}></span></div>
    <div class={SKY.orbit()}><span class={SKY.planet()}></span></div>
  </div>
  <div class={SKY.stars()}><canvas bind:this={canvas} class={SKY.canvas()}></canvas></div>
</div>
