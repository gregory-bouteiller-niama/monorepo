import { readIndexPage } from "@niama/domain/functions/pages";
import { ContactForm } from "@niama/ui/react/contact-form";
import { Separator } from "@niama/ui/react/separator";
import { INDEX_PAGE, updateHash } from "@niama/ui/shared/index-page";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { AttendantsCarousel } from "@/components/attendants/carousel";
import { DisciplinesCarousel } from "@/components/disciplines/carousel";
import { Section } from "@/components/section";
import { createContact } from "@/functions/form";

// ROUTE -----------------------------------------------------------------------------------------------------------------------------------
export const Route = createFileRoute("/_public/")({
	component: IndexPage,
	loader: () => readIndexPage(),
});

// PAGE ------------------------------------------------------------------------------------------------------------------------------------
function IndexPage() {
	const navigate = useNavigate();
	const { attendants, contact, disciplines, hero } = Route.useLoaderData();

	useEffect(() => updateHash((hash) => navigate({ to: "/", hash, replace: true, hashScrollIntoView: false })), [navigate]);

	return (
		<div className={INDEX_PAGE.base()}>
			<Section className={INDEX_PAGE.hero()} id="top-3">
				<div className={INDEX_PAGE.heroContent()}>
					<h1 className={INDEX_PAGE.heroTitle()}>{hero.title}</h1>
					<p className={INDEX_PAGE.heroDescription()}>{hero.description}</p>
				</div>
			</Section>
			<Section id="les-voies" {...disciplines} withSeparator>
				<DisciplinesCarousel {...disciplines} />
			</Section>
			<Section id="les-accompagnants" {...attendants} withSeparator>
				<AttendantsCarousel {...attendants} autoplay={10} />
			</Section>
			<Section id="contact" {...contact} withSeparator>
				<ContactForm
					onSubmit={async (value) => await createContact({ data: value })}
					onSuccess={() => toast.success("Merci de votre intérêt ! Nous reviendrons vers vous très bientôt.")}
				/>
				<Separator className="self-center! mb-34 h-24" orientation="vertical" />
			</Section>
		</div>
	);
}
