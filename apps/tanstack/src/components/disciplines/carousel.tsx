import type { Disciplines } from "@niama/domain/functions/disciplines";
import { cn } from "@niama/ui/lib/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@niama/ui/react/carousel";
import { Item, ItemContent, ItemDescription, ItemMedia, type ItemProps, ItemTitle } from "@niama/ui/react/item";
import { Logo } from "@niama/ui/react/logo";
import { GLOW } from "@niama/ui/shared/glow";
import { DISCIPLINES_CAROUSEL } from "@niama/ui/styles/disciplines/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useGlow } from "../use-glow";

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function DisciplinesCarousel({ items }: DisciplinesCarouselProps) {
	return (
		<div className={DISCIPLINES_CAROUSEL.base()}>
			<Carousel className={DISCIPLINES_CAROUSEL.carousel()} opts={{ loop: true }} plugins={[Autoplay({ delay: 10_000 })]}>
				<CarouselContent>
					{items.map((item) => (
						<CarouselItem className={DISCIPLINES_CAROUSEL.carouselItem()} key={item.slug}>
							<DisciplineGlowItem className={DISCIPLINES_CAROUSEL.item()} tone={item.slug} variant="outline">
								<ItemMedia className={DISCIPLINES_CAROUSEL.itemMedia()}>
									<Logo className={DISCIPLINES_CAROUSEL.logo()} discipline={item.name} tone={item.slug} />
								</ItemMedia>
								<ItemContent className={DISCIPLINES_CAROUSEL.itemContent()}>
									<ItemTitle className={DISCIPLINES_CAROUSEL.itemTitle()}>{item.title}</ItemTitle>
									{item.description.map((sentence) => (
										<ItemDescription className={DISCIPLINES_CAROUSEL.itemDescription()} key={sentence}>
											{sentence}
										</ItemDescription>
									))}
								</ItemContent>
							</DisciplineGlowItem>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className={DISCIPLINES_CAROUSEL.carouselControl()} />
				<CarouselNext className={DISCIPLINES_CAROUSEL.carouselControl()} />
				<aside className={DISCIPLINES_CAROUSEL.mobileControls()}>
					<CarouselPrevious className={DISCIPLINES_CAROUSEL.mobileControl()} />
					<CarouselNext className={DISCIPLINES_CAROUSEL.mobileControl()} />
				</aside>
			</Carousel>
		</div>
	);
}
export type DisciplinesCarouselProps = { items: Disciplines["Entity"][] };

function DisciplineGlowItem({ children, className, tone, ...r }: DisciplineGlowItemProps) {
	const { props, ref } = useGlow();

	return (
		<Item ref={ref} className={cn(GLOW(), className)} data-tone={tone} {...r} {...props}>
			{children}
		</Item>
	);
}
type DisciplineGlowItemProps = ItemProps & { tone?: Disciplines["Entity"]["slug"] };
