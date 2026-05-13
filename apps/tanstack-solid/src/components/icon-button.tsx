import { ICON_BUTTON } from "@niama/ui/icon-button";
import { cn } from "@niama/ui-solid/lib/utils";
import { Button, type ButtonProps } from "@niama/ui-solid/ui/button";

export function IconButton(props: IconButtonProps) {
  const { class: className, icon, label, loading = false, disabled, size = "icon", variant = "outline", ...rest } = props;
  const isDisabled = disabled || loading;

  return (
    <Button
      aria-label={label}
      class={cn(ICON_BUTTON.base(), className)}
      data-loading={loading}
      disabled={isDisabled}
      size={size}
      title={label}
      variant={variant}
      {...rest}
    >
      <span class={cn(ICON_BUTTON.icon(), icon)} />
    </Button>
  );
}

export type IconButtonProps = {
  class?: string;
  icon: string;
  label: string;
  loading?: boolean;
} & ButtonProps;
