import { useFormContext } from "@niama/ui-react/hooks/form-context";
import { Button } from "@niama/ui-react/button";
import { LoadingSwap } from "@niama/ui-react/loading-swap";
import { useRef } from "react";

export default function Submit() {
  const form = useFormContext();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button className="cursor-pointer text-base" ref={buttonRef} size="lg" type="submit">
          <LoadingSwap isLoading={isSubmitting}>Envoyer</LoadingSwap>
        </Button>
      )}
    </form.Subscribe>
  );
}
