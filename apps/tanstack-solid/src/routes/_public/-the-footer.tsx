import { BUTTON } from "@niama/ui/button";
import { cn } from "@niama/ui/lib/utils";
import { THE_FOOTER } from "@niama/ui/the-footer";
import type { ReadPublicLayoutProps } from "@/lib/layouts";

export function TheFooter(props: Pick<ReadPublicLayoutProps, "socials">) {
  const { socials } = props;

  return (
    <footer class={THE_FOOTER.base()}>
      <a class={cn(BUTTON({ variant: "outline" }), THE_FOOTER.disclaimer())} href="/">
        Mentions Légales
      </a>
      <div class={THE_FOOTER.socials()}>
        {socials.map(({ href, icon, label }) => (
          <a
            aria-label={label}
            class={cn(BUTTON({ size: "icon", variant: "outline" }), THE_FOOTER.social())}
            href={href}
            rel="noopener"
            target="_blank"
            title={label}
          >
            <span class={icon} />
          </a>
        ))}
      </div>
    </footer>
  );
}
