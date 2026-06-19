import React, { useEffect, useState } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { Sun, Moon, Monitor } from "@site/src/components/ui/icons";
import cn from "@site/src/utils/cn";

type Choice = "system" | "light" | "dark";

const OPTIONS = [
  { value: "system", label: "System", Icon: Monitor },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
] as const;

// Docusaurus persists an explicit "light"/"dark" choice under this key and
// clears it when following the OS preference — so an empty slot means "system".
const readChoice = (): Choice => {
  try {
    const stored = localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
};

const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { setColorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);
  const [choice, setChoice] = useState<Choice>("system");

  // The stored choice is only available client-side; avoid a hydration mismatch.
  useEffect(() => {
    setMounted(true);
    setChoice(readChoice());
  }, []);

  const select = (value: Choice) => {
    setChoice(value);
    // `setColorMode(null)` resets to the OS preference. The public type only
    // allows "light" | "dark", but the runtime accepts null to mean "system".
    const apply = setColorMode as (mode: "light" | "dark" | null) => void;
    apply(value === "system" ? null : value);
  };

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full p-0.5 backdrop-blur-sm",
        "border border-white/20 bg-white/10",
        "dark:border-white/10 dark:bg-white/5",
        className,
      )}
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const isActive = mounted && choice === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            title={label}
            onClick={() => select(value)}
            className={cn(
              "flex size-7 items-center justify-center rounded-full outline-none transition-all duration-200",
              "focus-visible:ring-2 focus-visible:ring-white/70",
              isActive
                ? "bg-white text-primary-50 shadow-sm dark:bg-white/15 dark:text-white dark:shadow-none"
                : "text-white/70 hover:bg-white/15 hover:text-white dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white",
            )}
          >
            <Icon className="size-4" aria-hidden="true" focusable="false" />
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
