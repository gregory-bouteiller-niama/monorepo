import { headerStore, selectStainStyle } from "@niama/ui/lib/stores/header";
import { clearHovered, observeNavLink, THE_HEADER } from "@niama/ui/the-header";
import { Button } from "@niama/ui-react/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@niama/ui-react/dropdown-menu";
import { Logo } from "@niama/ui-react/logo";
import { Separator } from "@niama/ui-react/separator";
import { ThemeSwitcher } from "@niama/ui-react/theme-switcher";
import { Link, useLocation } from "@tanstack/react-router";
import { useSelector } from "@tanstack/react-store";
import { useEffect, useRef } from "react";
import { Section } from "@/components/section";
import type { ReadPublicLayoutProps } from "@/lib/layouts";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function TheHeader({ navs }: Pick<ReadPublicLayoutProps, "navs">) {
  const hash = useLocation({ select: ({ hash }) => hash });
  const stainStyle = useSelector(headerStore, selectStainStyle);

  useEffect(() => headerStore.actions.setActive(navs.find((nav) => nav.hash === hash)?.hash), [hash, navs]);

  return (
    <>
      <div className={THE_HEADER.wrapper()}>
        <header className={THE_HEADER.base()}>
          <Link aria-label="Retour à l'accueil" className={THE_HEADER.logo()} to="/">
            <Logo showTitle={false} />
          </Link>

          <div className={THE_HEADER.actions()}>
            <ThemeSwitcher />
            {/* <HeaderUser signInUrl={signInUrl} signUpUrl={signUpUrl} /> */}
            <HeaderBurger navs={navs} />
          </div>
        </header>
      </div>
      <Section className="flex justify-center" id="top-1">
        <Link aria-label="Retour à l'accueil" className={THE_HEADER.logoMain()} to="/">
          <Logo className="w-full" />
        </Link>
      </Section>
      <Separator className="self-center! h-6" orientation="vertical" />
      <Section className={THE_HEADER.menu()} id="top-2">
        {/** biome-ignore lint/a11y/noNoninteractiveElementInteractions: false positive */}
        <nav className={THE_HEADER.nav()} onMouseLeave={clearHovered}>
          <div aria-hidden="true" className={THE_HEADER.stain()} style={stainStyle} />
          {navs.map((nav) => (
            <Link {...nav} activeOptions={{ includeHash: true }} key={nav.key} resetScroll={false}>
              <HeaderNav nav={nav} />
            </Link>
          ))}
        </nav>
      </Section>
      <Separator className="self-center! h-24" orientation="vertical" />
    </>
  );
}

// NAV -------------------------------------------------------------------------------------------------------------------------------------
function HeaderNav({ nav: { hash, text } }: HeaderNavProps) {
  const ref = useRef<HTMLButtonElement | null>(null);

  const handleOnMouseEnter = () => headerStore.actions.setHovered(hash);

  useEffect(() => (ref.current ? observeNavLink(hash, ref.current) : undefined), [hash]);

  return (
    <button className={THE_HEADER.navLink()} onMouseEnter={handleOnMouseEnter} ref={ref} type="button">
      <span className={THE_HEADER.stainContent()}>{text}</span>
    </button>
  );
}
export type HeaderNavProps = { nav: ReadPublicLayoutProps["navs"][number] };

// BURGER ----------------------------------------------------------------------------------------------------------------------------------
function HeaderBurger({ navs }: Pick<ReadPublicLayoutProps, "navs">) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button aria-label="Menu" className={THE_HEADER.burger()} size="icon" variant="outline">
            <span className={THE_HEADER.burgerIcon()} />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className={THE_HEADER.burgerContent()} sideOffset={18}>
        <DropdownMenuGroup>
          {navs.map(({ key, ...nav }) => (
            <DropdownMenuItem
              className={THE_HEADER.burgerItem()}
              key={key}
              render={<Link {...nav} activeOptions={{ includeHash: true }} resetScroll={false} />}
            >
              {nav.text}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// USER ------------------------------------------------------------------------------------------------------------------------------------
// function HeaderUser({ signInUrl, signUpUrl }: { signInUrl: string; signUpUrl: string }) {
//   const { signOut, user } = useAuth();

//   if (!user)
//     return (
//       <DropdownMenu>
//         <DropdownMenuTrigger
//           render={
//             <Button size="icon">
//               <span className="icon-[tabler--user]" />
//             </Button>
//           }
//         />
//         <DropdownMenuContent align="end" className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" sideOffset={4}>
//           <DropdownMenuGroup>
//             <DropdownMenuItem render={<a href={signInUrl} />}>
//               <span className="icon-[tabler--login]" />
//               Je me connecte
//             </DropdownMenuItem>
//             <DropdownMenuItem render={<a href={signUpUrl} />}>
//               <span className="icon-[tabler--user-plus]" />
//               Je m'inscris
//             </DropdownMenuItem>
//           </DropdownMenuGroup>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     );

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger
//         render={
//           <Button size="icon">
//             <span className="icon-[tabler--user]" />
//           </Button>
//         }
//       />
//       <DropdownMenuContent align="end" className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" side="right" sideOffset={4}>
//         <DropdownMenuGroup>
//           <DropdownMenuLabel className="p-0 font-normal">
//             <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
//               <Avatar className="h-8 w-8 rounded-lg">
//                 <AvatarImage alt={user?.name} src={user?.avatar} />
//                 <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//               </Avatar>
//               <div className="grid flex-1 text-left text-sm leading-tight">
//                 <span className="truncate font-medium">{user?.name}</span>
//                 <span className="truncate text-muted-foreground text-xs">{user?.email}</span>
//               </div>
//             </div>
//           </DropdownMenuLabel>
//         </DropdownMenuGroup>
//         <DropdownMenuSeparator />
//         <DropdownMenuGroup>
//           <DropdownMenuItem>
//             <span className="icon-[tabler--user-circle]" />
//             Mon compte
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             <span className="icon-[tabler--notification]" />
//             Mes notifications
//           </DropdownMenuItem>
//         </DropdownMenuGroup>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem onClick={() => signOut()}>
//           <span className="icon-[tabler--logout]" />
//           Je me déconnecte
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
