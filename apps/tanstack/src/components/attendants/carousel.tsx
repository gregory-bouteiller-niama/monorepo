import type { Attendants } from "@niama/domain/functions/attendants";
import { cn } from "@niama/ui/lib/utils";
import { Button } from "@niama/ui/react/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@niama/ui/react/card";
import { GLOW } from "@niama/ui/shared/glow";
import { ATTENDANTS_CAROUSEL } from "@niama/ui/styles/attendants/carousel";
import { Image } from "@unpic/react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { DisciplinesBadge } from "../disciplines/badge";
import { useGlow } from "../use-glow";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export const AttendantsCarousel = ({ autoplay = Number.NaN, items }: AttendantsCarouselProps) => {
	// STATE
	const [activeIndex, setActiveIndex] = useState(0);
	// REFS
	const asideRef = useRef<HTMLDivElement>(null);
	const autoplayRef = useRef<NodeJS.Timeout>(undefined);
	// MEMOS
	const size = items.length;
	const active = items[activeIndex];
	// CALLBACKS
	const getStatus = useCallback(
		(index: number) => {
			if (index === activeIndex) return "current";
			if ((activeIndex - 1 + size) % size === index) return "prev";
			if ((activeIndex + 1) % size === index) return "next";
			return "other";
		},
		[activeIndex, size],
	);

	const handleNext = useCallback(() => {
		setActiveIndex((prev) => (prev + 1) % size);
		clearInterval(autoplayRef.current);
	}, [size]);

	const handlePrev = useCallback(() => {
		setActiveIndex((prev) => (prev - 1 + size) % size);
		clearInterval(autoplayRef.current);
	}, [size]);
	// AUTOPLAY
	useEffect(() => {
		if (!Number.isNaN(autoplay)) autoplayRef.current = setInterval(() => setActiveIndex((prev) => (prev + 1) % size), autoplay * 1000);
		return () => clearInterval(autoplayRef.current);
	}, [autoplay, size]);
	// KEYBOARD NAV
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") handlePrev();
			if (e.key === "ArrowRight") handleNext();
		};
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [handleNext, handlePrev]);

	return (
		<div className={ATTENDANTS_CAROUSEL.base()}>
			<aside className={ATTENDANTS_CAROUSEL.aside()} ref={asideRef}>
				{items.map(({ image }, index) => (
					<Image
						{...image}
						className={ATTENDANTS_CAROUSEL.image({ status: getStatus(index) })}
						data-index={index}
						key={image.alt}
						operations={{ imagekit: { f: "avif" } }}
						sizes="(min-width: 1280px) 536px, (min-width: 1024px) 440px, (min-width: 768px) 704px, (min-width: 640px) 576px, 100vw"
					/>
				))}
			</aside>
			<main className={ATTENDANTS_CAROUSEL.main()}>
				<AnimatePresence mode="wait">
					<motion.div
						animate={{ opacity: 1, y: 0 }}
						className="flex-1"
						exit={{ opacity: 0, y: -20 }}
						initial={{ opacity: 0, y: 20 }}
						key={activeIndex}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						<AttendantGlowCard className="h-full lg:h-[448px] xl:h-[400px]">
							<CardHeader>
								<CardTitle className={ATTENDANTS_CAROUSEL.name()}>{active.name}</CardTitle>
								<CardDescription className={ATTENDANTS_CAROUSEL.disciplines()}>
									{active.disciplines.map(({ slug }) => (
										<DisciplinesBadge key={slug} slug={slug} />
									))}
								</CardDescription>
							</CardHeader>
							<CardContent className={ATTENDANTS_CAROUSEL.description()}>
								{active.description.map((paragraph) => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</CardContent>
						</AttendantGlowCard>
					</motion.div>
				</AnimatePresence>
				<div className={ATTENDANTS_CAROUSEL.actions()}>
					<Button aria-label="Participant précédent" className="cursor-pointer" onClick={handlePrev} size="icon-sm" variant="outline">
						<span className="icon-[lucide--chevron-left]" />
					</Button>
					<Button aria-label="Participant suivant" className="cursor-pointer" onClick={handleNext} size="icon-sm" variant="outline">
						<span className="icon-[lucide--chevron-right]" />
					</Button>
				</div>
			</main>
		</div>
	);
};
export type AttendantsCarouselProps = { autoplay?: number; items: Attendants["Entity"][] };

function AttendantGlowCard({ children, className }: React.PropsWithChildren<{ className?: string }>) {
	const { props, ref } = useGlow();

	return (
		<Card ref={ref} className={cn(GLOW(), className)} {...props}>
			{children}
		</Card>
	);
}
