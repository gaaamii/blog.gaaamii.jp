import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  theme?: "primary" | "secondary" | "text";
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

  const textClassNames = ["underline", "cursor-pointer", "inline-block"];

  const themeClassNames: Record<Props["theme"], string[]> = {
    primary: primaryClassNames,
    secondary: secondaryClassNames,
    text: textClassNames,
  };

  return themeClassNames[theme];
};

const getSizeClassNames = (size: Props["size"], theme: Props["theme"]) => {
  if (theme === "text") {
    return [];
  }

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
  const baseClassNames = ["cursor-pointer", "transition-colors"];

  const themeClassNames = getThemeClassNames(theme);
  const sizeClassNames = getSizeClassNames(size, theme);

  return [...baseClassNames, ...themeClassNames, ...sizeClassNames].join(" ");
};
