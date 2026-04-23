import { Separator } from "@niama/ui/react/separator";
import { SECTION } from "@niama/ui/styles/section.ts";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function Section({ children, className, description, id, title, withSeparator }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInViewAnimate = useInView(ref, { margin: "0% 0px -30% 0px" });

  return (
    <motion.section
      animate={isInViewAnimate ? { opacity: 1, y: 0 } : {}}
      className={SECTION.base({ className })}
      data-section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      ref={ref}
      transition={{ duration: 0.5 }}
    >
      {withSeparator && <Separator className={SECTION.separator()} orientation="vertical" />}
      {title && <h2 className={SECTION.title()}>{title}</h2>}
      {description && <p className={SECTION.description()}>{description}</p>}
      {children}
    </motion.section>
  );
}
export type SectionProps = React.ComponentProps<"section"> & { description?: string; id: string; title?: string; withSeparator?: boolean };
