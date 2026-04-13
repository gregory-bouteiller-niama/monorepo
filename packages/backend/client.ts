import { ConvexHttpClient } from "convex/browser";

const getConvexUrl = (url: string): string => {
  if (!url) {
    throw new Error("Missing VITE_CONVEX_URL.");
  }

  try {
    return new URL(url).toString();
  } catch {
    throw new Error("Invalid VITE_CONVEX_URL.");
  }
};

export const createConvexHttpClient = (url: string): ConvexHttpClient => new ConvexHttpClient(getConvexUrl(url));
