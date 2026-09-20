import { useEffect, useState } from "react";
import { Cluster } from "../Cluster";
import { Toggle } from "../Toggle";

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

  return (
    <Cluster
      space="2"
      align="center"
      className={theme === null ? "invisible" : undefined}
    >
      <Toggle
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        label={`テーマを${nextLabel}に切り替え`}
        size={size}
      />

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
