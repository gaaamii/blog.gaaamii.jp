import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { type LinkProps as NextLinkProps } from "next/link";

type CommonProps = {
  theme?: "primary" | "secondary" | "text" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
};
type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };
type LinkProps = CommonProps & NextLinkProps & { as: "Link" };
type AnchorProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };

type Props = ButtonProps | LinkProps | AnchorProps;

export const Button = ({
  theme = "primary",
  size = "lg",
  children,
  as,
  ...attributes
}: Props) => {
  const classNames = getClassNames({ theme, size });

  switch (as) {
    case "Link":
      return (
        <Link {...(attributes as LinkProps)} className={classNames}>
          {children}
        </Link>
      );
    case "a":
      return (
        <a {...(attributes as AnchorProps)} className={classNames}>
          {children}
        </a>
      );
    case "button":
    default:
      return (
        <button {...(attributes as ButtonProps)} className={classNames}>
          {children}
        </button>
      );
  }
};

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
    "font-bold",
    "disabled:cursor-not-allowed",

    // light theme
    "bg-neutral-200",
    "text-black",
    "hover:bg-neutral-300",
    "disabled:bg-neutral-400",
    "disabled:text-white",

    // dark theme
    "dark:bg-stone-700",
    "dark:text-stone-200",
    "dark:hover:text-white",
    "dark:focus:text-white",
    "dark:hover:bg-stone-600",
  ];

  const outlineClassNames = [
    "border-2",

    // light
    "border-gray-200",
    "hover:bg-neutral-200",
    "hover:border-neutral-400",

    // dark
    "dark:border-stone-400",
    "dark:hover:bg-stone-700",
    "dark:hover:border-stone-200",
    "dark:hover:text-white",
  ];

  const textClassNames = ["underline", "cursor-pointer", "inline-block"];

  const themeClassNames: Record<Props["theme"], string[]> = {
    primary: primaryClassNames,
    secondary: secondaryClassNames,
    text: textClassNames,
    outline: outlineClassNames,
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
      return ["px-10", "py-3", "rounded-md", "text-md"];
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
  const sizeClassNames = getSizeClassNames(size, theme);

  return [...baseClassNames, ...themeClassNames, ...sizeClassNames].join(" ");
};
