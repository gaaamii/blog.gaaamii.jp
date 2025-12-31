import { useEffect, useState } from "react";
import { Cluster } from "../Cluster";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

const getPreferredTheme = (): Theme => {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyThemeToDocument = (theme: Theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
};

export const ThemeToggle = ({ size = "sm" }: { size?: "sm" | "md" | "lg" }) => {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const preferred = getPreferredTheme();
    setTheme((current) => {
      const next = current ?? preferred;
      return next;
    });
  }, []);

  useEffect(() => {
    if (theme === null) {
      return;
    }

    applyThemeToDocument(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const effectiveTheme: Theme = theme ?? "light";
  const isDark = effectiveTheme === "dark";
  const currentLabel = isDark ? "ダーク" : "ライト";
  const nextLabel = isDark ? "ライト" : "ダーク";

  const sizeClassNames =
    size === "lg"
      ? {
          root: "h-8 w-16",
          thumb: "h-6 w-6",
          thumbOff: "translate-x-1",
          thumbOn: "translate-x-9",
        }
      : size === "md"
        ? {
            root: "h-7 w-14",
            thumb: "h-5 w-5",
            thumbOff: "translate-x-1",
            thumbOn: "translate-x-8",
          }
        : {
            root: "h-6 w-11",
            thumb: "h-4 w-4",
            thumbOff: "translate-x-1",
            thumbOn: "translate-x-6",
          };

  return (
    <Cluster space="2" align="center">
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={`テーマを${nextLabel}に切り替え`}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={[
          "relative inline-flex items-center rounded-full transition-colors",
          "bg-neutral-200 dark:bg-neutral-700",
          "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2",
          "focus:ring-offset-white dark:focus:ring-offset-neutral-900",
          sizeClassNames.root,
        ].join(" ")}
      >
        <span className="sr-only">テーマ切り替え</span>
        <span
          aria-hidden
          className={[
            "inline-block transform rounded-full bg-white shadow transition-transform",
            sizeClassNames.thumb,
            isDark ? sizeClassNames.thumbOn : sizeClassNames.thumbOff,
          ].join(" ")}
        />
      </button>

      <span
        className={[
          "rounded px-2 py-1 text-xs font-medium",
          isDark
            ? "bg-black text-neutral-300"
            : "bg-neutral-200 text-neutral-700",
        ].join(" ")}
      >
        {currentLabel}
      </span>
    </Cluster>
  );
};
