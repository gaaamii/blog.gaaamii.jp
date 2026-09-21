import { useEffect, useState } from "react";

type ToggleSize = "sm" | "md" | "lg";

type Props = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  size?: ToggleSize;
};

const sizes = {
  sm: {
    root: "h-6 w-11",
    thumb: "h-4 w-4",
    off: "translate-x-1",
    on: "translate-x-6",
  },
  md: {
    root: "h-7 w-14",
    thumb: "h-5 w-5",
    off: "translate-x-1",
    on: "translate-x-8",
  },
  lg: {
    root: "h-8 w-16",
    thumb: "h-6 w-6",
    off: "translate-x-1",
    on: "translate-x-9",
  },
} satisfies Record<ToggleSize, Record<string, string>>;

export const Toggle = ({
  checked,
  onCheckedChange,
  label,
  size = "sm",
}: Props) => {
  const classes = sizes[size];
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setCanAnimate(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onCheckedChange(!checked)}
      className={[
        "relative inline-flex items-center rounded-full bg-neutral-200 dark:bg-neutral-700",
        canAnimate ? "transition-colors" : undefined,
        "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2",
        "focus:ring-offset-white dark:focus:ring-offset-neutral-900",
        classes.root,
      ].join(" ")}
    >
      <span
        aria-hidden
        className={[
          "inline-block transform rounded-full bg-white shadow",
          canAnimate ? "transition-transform" : undefined,
          classes.thumb,
          checked ? classes.on : classes.off,
        ].join(" ")}
      />
    </button>
  );
};
