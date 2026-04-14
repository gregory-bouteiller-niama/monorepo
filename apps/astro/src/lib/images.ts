const DEFAULT_IMAGE_WIDTH = 1200;
const MAX_IMAGE_WIDTH = 1600;
const MAX_IMAGE_QUALITY = 90;
const MIN_IMAGE_QUALITY = 40;

type ImageFormat = "auto" | "avif" | "jpeg" | "png" | "webp";
type ImageFit = "contain" | "cover" | "scale-down";

type ImageUrlOptions = {
	fit?: ImageFit;
	format?: ImageFormat;
	quality?: number;
	width?: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const encodeImageKey = (key: string) =>
	key
		.split("/")
		.filter(Boolean)
		.map((segment) => encodeURIComponent(segment))
		.join("/");

export const buildImageUrl = (
	key: string,
	{ fit = "cover", format = "auto", quality = 80, width = DEFAULT_IMAGE_WIDTH }: ImageUrlOptions = {},
) => {
	const searchParams = new URLSearchParams({
		fit,
		format,
		q: String(clamp(quality, MIN_IMAGE_QUALITY, MAX_IMAGE_QUALITY)),
		w: String(clamp(width, 1, MAX_IMAGE_WIDTH)),
	});

	return `/images/${encodeImageKey(key)}?${searchParams.toString()}`;
};
