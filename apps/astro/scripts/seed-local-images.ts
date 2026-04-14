import { spawnSync } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { allImages } from "@niama/domain/functions/images";

const LOCAL_BUCKET_NAME = "images";
const LOCAL_PERSIST_PATH = join(process.cwd(), ".wrangler/state");

const contentTypeByExtension = {
	avif: "image/avif",
	gif: "image/gif",
	jpeg: "image/jpeg",
	jpg: "image/jpeg",
	png: "image/png",
	webp: "image/webp",
} as const;

const getContentType = (key: string, fallback: string | null) => {
	if (fallback) return fallback;

	const extension = key.split(".").at(-1)?.toLowerCase();
	return extension ? contentTypeByExtension[extension as keyof typeof contentTypeByExtension] : undefined;
};

const seedObject = (key: string, filePath: string, contentType?: string) => {
	const args = [
		"wrangler",
		"r2",
		"object",
		"put",
		`${LOCAL_BUCKET_NAME}/${key}`,
		"--local",
		"--persist-to",
		LOCAL_PERSIST_PATH,
		"--file",
		filePath,
	];

	if (contentType) {
		args.push("--content-type", contentType);
	}

	const result = spawnSync("bunx", args, {
		cwd: process.cwd(),
		stdio: "inherit",
	});

	if (result.status !== 0) {
		throw new Error(`Failed to seed local image: ${key}`);
	}
};

const main = async () => {
	const tempDirectory = await mkdtemp(join(tmpdir(), "niama-astro-seed-"));

	try {
		for (const image of allImages) {
			const response = await fetch(image.src);

			if (!response.ok) {
				throw new Error(`Failed to download source image: ${image.src}`);
			}

			const tempFilePath = join(tempDirectory, basename(image.key));
			await Bun.write(tempFilePath, await response.arrayBuffer());

			seedObject(image.key, tempFilePath, getContentType(image.key, response.headers.get("content-type")));
		}
	} finally {
		await rm(tempDirectory, { force: true, recursive: true });
	}
};

await main();
