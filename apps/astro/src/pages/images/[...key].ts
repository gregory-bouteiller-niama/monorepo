import { env } from "cloudflare:workers";
import { allImages } from "@niama/domain/functions/images";
import type { APIRoute } from "astro";

const CACHE_CONTROL_HEADER = "public, max-age=31536000, s-maxage=31536000, immutable";
const DEFAULT_IMAGE_QUALITY = 80;
const DEFAULT_IMAGE_WIDTH = 1200;
const MAX_IMAGE_QUALITY = 90;
const MAX_IMAGE_WIDTH = 1600;
const MIN_IMAGE_QUALITY = 40;
const MIN_IMAGE_WIDTH = 1;
const SUPPORTED_FITS = new Set(["contain", "cover", "scale-down"]);
const SUPPORTED_FORMATS = new Set(["auto", "avif", "jpeg", "png", "webp"]);
const VALID_IMAGE_KEY = /^[a-z0-9/_-]+\.(avif|gif|jpe?g|png|webp)$/i;
const allowedImageKeys = new Set(allImages.map(({ key }) => key));

type OutputFormat = "image/avif" | "image/jpeg" | "image/png" | "image/webp";
type TransformFit = "contain" | "cover" | "scale-down";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const badRequest = (message: string) => new Response(message, { status: 400 });

const pickOutputFormat = (request: Request, requestedFormat: string | null): OutputFormat => {
	switch (requestedFormat) {
		case "avif":
			return "image/avif";
		case "jpeg":
			return "image/jpeg";
		case "png":
			return "image/png";
		case "webp":
			return "image/webp";
		default: {
			const accept = request.headers.get("accept") ?? "";

			if (accept.includes("image/avif")) return "image/avif";
			if (accept.includes("image/webp")) return "image/webp";
			return "image/jpeg";
		}
	}
};

const readImageFit = (requestUrl: URL): TransformFit => {
	const fit = requestUrl.searchParams.get("fit");

	if (fit && SUPPORTED_FITS.has(fit)) {
		return fit as TransformFit;
	}

	return "cover";
};

const readImageKey = (value: string | undefined) => {
	if (!value) return null;

	const key = decodeURIComponent(value);

	if (!VALID_IMAGE_KEY.test(key) || key.includes("..")) {
		return null;
	}

	if (!allowedImageKeys.has(key)) {
		return null;
	}

	return key;
};

const readImageQuality = (requestUrl: URL) => {
	const quality = Number(requestUrl.searchParams.get("q") ?? DEFAULT_IMAGE_QUALITY);

	if (!Number.isFinite(quality)) {
		return DEFAULT_IMAGE_QUALITY;
	}

	return clamp(Math.round(quality), MIN_IMAGE_QUALITY, MAX_IMAGE_QUALITY);
};

const readImageWidth = (requestUrl: URL) => {
	const width = Number(requestUrl.searchParams.get("w") ?? DEFAULT_IMAGE_WIDTH);

	if (!Number.isFinite(width)) {
		return DEFAULT_IMAGE_WIDTH;
	}

	return clamp(Math.round(width), MIN_IMAGE_WIDTH, MAX_IMAGE_WIDTH);
};

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
	const key = readImageKey(params.key);

	if (!key) {
		return badRequest("Invalid image key.");
	}

	const requestedFormat = request.url ? new URL(request.url).searchParams.get("format") : null;
	if (requestedFormat && !SUPPORTED_FORMATS.has(requestedFormat)) {
		return badRequest("Invalid image format.");
	}

	const requestUrl = new URL(request.url);
	const object = await env.IMAGES_BUCKET.get(key);

	if (!object?.body) {
		return new Response("Image not found.", { status: 404 });
	}

	const transformed = await env.IMAGES.input(object.body)
		.transform({
			fit: readImageFit(requestUrl),
			gravity: "auto",
			width: readImageWidth(requestUrl),
		})
		.output({
			format: pickOutputFormat(request, requestedFormat),
			quality: readImageQuality(requestUrl),
		});

	const response = transformed.response();
	const headers = new Headers(response.headers);
	headers.set("Cache-Control", CACHE_CONTROL_HEADER);
	headers.set("Vary", "Accept");

	return new Response(response.body, {
		headers,
		status: response.status,
		statusText: response.statusText,
	});
};
