import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  theme?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
};

export const Button = ({
  theme = "primary",
  size = "lg",
  children,
  ...attributes
}: Props) => (
  <button {...attributes} className={getClassNames({ theme, size })}>
    {children}
  </button>
);

const getThemeClassNames = (theme: Props["theme"]) => {
  const primaryClassNames = [
    "bg-sky-600",
    "text-white",
    "hover:bg-sky-800",
    "disabled:bg-sky-900",
    "disabled:text-white",
  ];

  const secondaryClassNames = [
    "bg-neutral-200",
    "text-black",
    "hover:bg-neutral-300",
    "disabled:bg-neutral-400",
    "disabled:text-white",
  ];

  const themeClassNames =
    theme === "primary" ? primaryClassNames : secondaryClassNames;

  return themeClassNames;
};

const getSizeClassNames = (size: Props["size"]) => {
  switch (size) {
    case "lg":
      return ["px-12", "py-3", "rounded-md"];
    case "md": // TODO
    case "sm":
      return ["px-4", "py-1", "rounded-md"];
    default:
      return ["px-12", "py-3", "rounded-md"];
  }
};

const getClassNames = ({ theme, size }: Pick<Props, "theme" | "size">) => {
  const baseClassNames = ["cursor-pointer", "transition-colors"];

  const themeClassNames = getThemeClassNames(theme);
  const sizeClassNames = getSizeClassNames(size);

  return [...baseClassNames, ...themeClassNames, ...sizeClassNames].join(" ");
};
