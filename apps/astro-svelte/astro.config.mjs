// @ts-check
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  site: "https://niama.fr",
  image: {
    remotePatterns: [{ protocol: "https", hostname: "ik.imagekit.io", pathname: "/niamafr/**" }],
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Outfit",
      cssVariable: "--font-sans",
      subsets: ["latin"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Cormorant Upright",
      cssVariable: "--font-heading",
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "MuseoModerno",
      cssVariable: "--font-logo",
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
    },
  ],
  server: { port: 4322 },
  vite: {
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [tailwindcss()],
  },
  integrations: [svelte(), sitemap()],
});
