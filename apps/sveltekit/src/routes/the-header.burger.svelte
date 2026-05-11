<script lang="ts" module>
  import type { ReadPublicLayoutProps } from "@niama/domain/functions/layouts";

  export type HeaderBurgerProps = Pick<ReadPublicLayoutProps, "navs">;
</script>

<script lang="ts">
  import { THE_HEADER } from "@niama/ui/the-header";
  import { Button } from "@niama/ui-svelte/ui/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@niama/ui-svelte/ui/dropdown-menu";

  // PROPS
  let { navs }: HeaderBurgerProps = $props();
</script>

<DropdownMenu>
  <DropdownMenuTrigger>
    {#snippet child({ props })}
      <Button {...props} aria-label="Menu" class={THE_HEADER.burger()} size="icon" variant="outline">
        <span class={THE_HEADER.burgerIcon()}></span>
      </Button>
    {/snippet}
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" class={THE_HEADER.burgerContent()} sideOffset={18}>
    <DropdownMenuGroup>
      {#each navs as { key, ...nav }}
        <DropdownMenuItem class={THE_HEADER.burgerItem()}>
          <a {...nav}> {nav.text} </a>
        </DropdownMenuItem>
      {/each}
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
