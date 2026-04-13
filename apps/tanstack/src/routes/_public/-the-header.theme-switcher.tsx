import { Button } from "@niama/ui/react/button";
import { THE_HEADER } from "@niama/ui/shared/the-header";
import { toggleThemeWithTransition } from "@niama/ui/shared/theme";
import { useRef } from "react";

// HEADER THEME SWITCHER -------------------------------------------------------------------------------------------------------------------
export function HeaderThemeSwitcher() {
	const ref = useRef<HTMLButtonElement>(null);

	const handleClick = () => toggleThemeWithTransition(ref.current);

	return (
		<Button className={THE_HEADER.themeSwitcher()} onClick={handleClick} ref={ref} size="icon" type="button" variant="outline">
			<span className={THE_HEADER.sun()} />
			<span className={THE_HEADER.moon()} />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
