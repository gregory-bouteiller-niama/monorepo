import { THE_FOOTER } from "@niama/ui/the-footer";
import { Button } from "@niama/ui-react/ui/button";
import { IconButton } from "@niama/ui-react/ui/icon-button";
import { Link } from "@tanstack/react-router";
import type { ReadPublicLayoutProps } from "@/lib/layouts";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export const TheFooter = ({ socials }: Pick<ReadPublicLayoutProps, "socials">) => (
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
          render={<a href={href} rel="noopener" target="_blank" />}
          size="icon"
          variant="outline"
        />
      ))}
    </div>
  </footer>
);
