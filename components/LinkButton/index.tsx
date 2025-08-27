import { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode;
  theme?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
};

export const LinkButton = ({
  theme = "primary",
  size = "lg",
  children,
  ...attributes
}: Props) => (
  <a {...attributes} className={getClassNames({ theme, size })}>
    {children}
  </a>
);

const getThemeClassNames = (theme: Props["theme"]) => {
  const primaryClassNames = [
    "bg-sky-600",
    "text-white",
    "hover:bg-sky-800",
    "disabled:bg-sky-300",
    "disabled:text-white",
    "disabled:cursor-not-allowed",
    "font-bold",
  ];

  const secondaryClassNames = [
    "bg-neutral-200",
    "text-black",
    "hover:bg-neutral-300",
    "disabled:bg-neutral-400",
    "disabled:text-white",
    "disabled:cursor-not-allowed",
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
      return ["px-8", "py-2", "rounded-md", "text-sm"];
    default:
      return ["px-12", "py-3", "rounded-md", "text-md"];
  }
};

const getClassNames = ({ theme, size }: Pick<Props, "theme" | "size">) => {
  const baseClassNames = [
    "cursor-pointer",
    "transition-colors",
    "inline-block",
  ];

  const themeClassNames = getThemeClassNames(theme);
  const sizeClassNames = getSizeClassNames(size);

  return [...baseClassNames, ...themeClassNames, ...sizeClassNames].join(" ");
};
