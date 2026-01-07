import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon, Sun } from "@hugeicons/core-free-icons";

import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:bg-transparent hover:text-muted-foreground dark:hover:text-muted-foreground dark:hover:bg-transparent"
      onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}
    >
      <HugeiconsIcon
        icon={Sun}
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <HugeiconsIcon
        icon={Moon}
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
    </Button>
  );
}
