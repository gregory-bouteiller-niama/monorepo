import { CARD } from "@niama/ui/card";
import { cn } from "@niama/ui-react/lib/utils";

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function Card({ className, size = "default", ...props }: CardProps) {
  return <div className={cn(CARD.base(), className)} data-size={size} data-slot="card" {...props} />;
}
export type CardProps = React.ComponentProps<"div"> & { size?: "default" | "sm" };

// ACTION ----------------------------------------------------------------------------------------------------------------------------------
export function CardAction({ className, ...props }: CardActionProps) {
  return <div className={cn(CARD.action(), className)} data-slot="card-action" {...props} />;
}
export type CardActionProps = React.ComponentProps<"div">;

// CONTENT ---------------------------------------------------------------------------------------------------------------------------------
export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn(CARD.content(), className)} data-slot="card-content" {...props} />;
}
export type CardContentProps = React.ComponentProps<"div">;

// DESCRIPTION -----------------------------------------------------------------------------------------------------------------------------
export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return <div className={cn(CARD.description(), className)} data-slot="card-description" {...props} />;
}
export type CardDescriptionProps = React.ComponentProps<"div">;

// FOOTER ----------------------------------------------------------------------------------------------------------------------------------
export function CardFooter({ className, ...props }: CardFooterProps) {
  return <div className={cn(CARD.footer(), className)} data-slot="card-footer" {...props} />;
}
export type CardFooterProps = React.ComponentProps<"div">;

// HEADER ----------------------------------------------------------------------------------------------------------------------------------
export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn(CARD.header(), className)} data-slot="card-header" {...props} />;
}
export type CardHeaderProps = React.ComponentProps<"div">;

// TITLE -----------------------------------------------------------------------------------------------------------------------------------
export function CardTitle({ className, ...props }: CardTitleProps) {
  return <div className={cn(CARD.title(), className)} data-slot="card-title" {...props} />;
}
export type CardTitleProps = React.ComponentProps<"div">;
