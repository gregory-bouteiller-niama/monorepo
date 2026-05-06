import { Button, type ButtonProps } from "@niama/ui/react/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@niama/ui/react/tooltip";
import { ICON_BUTTON } from "@niama/ui/shared/icon-button";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function IconButton(props: IconButtonProps) {
  const { icon, label, loading = false, className, disabled, size = "icon", variant = "outline", ...rest } = props;
  const isDisabled = disabled || loading;

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            aria-label={label}
            className={ICON_BUTTON.base({ className })}
            data-loading={loading}
            disabled={isDisabled}
            size={size}
            variant={variant}
            {...rest}
          />
        }
      >
        <span className={ICON_BUTTON.icon({ className: icon })} />
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
export type IconButtonProps = { className?: string; icon: string; label: string; loading?: boolean } & ButtonProps;
