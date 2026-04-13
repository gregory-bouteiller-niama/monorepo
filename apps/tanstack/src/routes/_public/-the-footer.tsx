import { Button } from "@niama/ui/react/button";
import { THE_FOOTER } from "@niama/ui/styles/the-footer";
import { Link } from "@tanstack/react-router";
import { IconButton } from "@/components/icon-button";
import type { ReadPublicLayoutProps } from "@/lib/layouts";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export const TheFooter = ({ socials }: Pick<ReadPublicLayoutProps, "socials">) => {
	return (
		<footer className={THE_FOOTER.base()}>
			<Button className={THE_FOOTER.disclaimer()} nativeButton={false} render={<Link to="/" />} variant="outline">
				Mentions Légales
			</Button>
			<div className={THE_FOOTER.socials()}>
				{socials.map(({ href, icon, key, label }) => (
					<IconButton
						className={THE_FOOTER.social()}
						icon={icon}
						key={key}
						label={label}
						nativeButton={false}
						render={<a href={href} target="_blank" rel="noopener" />}
						size="icon"
						variant="outline"
					/>
				))}
			</div>
		</footer>
	);
};
