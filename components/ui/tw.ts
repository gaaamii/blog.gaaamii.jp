export type TwSpacing =
  | "0"
  | "0.5"
  | "1"
  | "1.5"
  | "2"
  | "2.5"
  | "3"
  | "3.5"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "14"
  | "16"
  | "20"
  | "24"
  | "28"
  | "32"
  | "36"
  | "40"
  | "44"
  | "48"
  | "52"
  | "56"
  | "60"
  | "64"
  | "72"
  | "80"
  | "96";

export const twSpacingToClass = (prefix: "p" | "px" | "gap", value?: TwSpacing) => {
  if (!value) {
    return undefined;
  }

  const spacingClasses: Record<TwSpacing, string> = {
    "0": `${prefix}-0`,
    "0.5": `${prefix}-0.5`,
    "1": `${prefix}-1`,
    "1.5": `${prefix}-1.5`,
    "2": `${prefix}-2`,
    "2.5": `${prefix}-2.5`,
    "3": `${prefix}-3`,
    "3.5": `${prefix}-3.5`,
    "4": `${prefix}-4`,
    "5": `${prefix}-5`,
    "6": `${prefix}-6`,
    "7": `${prefix}-7`,
    "8": `${prefix}-8`,
    "9": `${prefix}-9`,
    "10": `${prefix}-10`,
    "11": `${prefix}-11`,
    "12": `${prefix}-12`,
    "14": `${prefix}-14`,
    "16": `${prefix}-16`,
    "20": `${prefix}-20`,
    "24": `${prefix}-24`,
    "28": `${prefix}-28`,
    "32": `${prefix}-32`,
    "36": `${prefix}-36`,
    "40": `${prefix}-40`,
    "44": `${prefix}-44`,
    "48": `${prefix}-48`,
    "52": `${prefix}-52`,
    "56": `${prefix}-56`,
    "60": `${prefix}-60`,
    "64": `${prefix}-64`,
    "72": `${prefix}-72`,
    "80": `${prefix}-80`,
    "96": `${prefix}-96`,
  };

  return spacingClasses[value];
};

export type TwAlign = "start" | "center" | "end" | "stretch" | "baseline";
export const twAlignToItemsClass = (align?: TwAlign) => {
  if (!align) {
    return undefined;
  }
  const map: Record<TwAlign, string> = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline",
  };
  return map[align];
};

export type TwJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";
export const twJustifyToClass = (justify?: TwJustify) => {
  if (!justify) {
    return undefined;
  }
  const map: Record<TwJustify, string> = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };
  return map[justify];
};

export type TwRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";
export const twRadiusToClass = (radius?: TwRadius) => {
  if (!radius) {
    return undefined;
  }
  const map: Record<TwRadius, string> = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    full: "rounded-full",
  };
  return map[radius];
};

export type TwBorderWidth = "0" | "1" | "2" | "4" | "8";
export const twBorderWidthToClass = (borderWidth?: TwBorderWidth) => {
  if (!borderWidth) {
    return undefined;
  }
  const map: Record<TwBorderWidth, string> = {
    "0": "border-0",
    "1": "border",
    "2": "border-2",
    "4": "border-4",
    "8": "border-8",
  };
  return map[borderWidth];
};

export type TwMaxWidth =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "full"
  | "prose";
export const twMaxWidthToClass = (maxWidth?: TwMaxWidth) => {
  if (!maxWidth) {
    return undefined;
  }
  const map: Record<TwMaxWidth, string> = {
    none: "max-w-none",
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
    prose: "max-w-prose",
  };
  return map[maxWidth];
};

export const cx = (...classes: Array<string | undefined | null | false>) =>
  classes.filter(Boolean).join(" ");

export type TwColorFamily = "neutral" | "stone" | "slate" | "gray" | "sky";
export type TwColorStep =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950";
export type TwColor = `${TwColorFamily}-${TwColorStep}`;

export const twColorToClass = (
  prefix: "bg" | "border" | "text",
  color?: TwColor,
) => {
  if (!color) {
    return undefined;
  }
  return `${prefix}-${color}`;
};

// Tailwind needs to "see" class names statically to generate them.
// This list is intentionally unused at runtime; it exists for Tailwind's content scan.
const __twColorSafelist = [
  "bg-neutral-50",
  "bg-neutral-100",
  "bg-neutral-200",
  "bg-neutral-300",
  "bg-neutral-400",
  "bg-neutral-500",
  "bg-neutral-600",
  "bg-neutral-700",
  "bg-neutral-800",
  "bg-neutral-900",
  "bg-neutral-950",
  "border-neutral-50",
  "border-neutral-100",
  "border-neutral-200",
  "border-neutral-300",
  "border-neutral-400",
  "border-neutral-500",
  "border-neutral-600",
  "border-neutral-700",
  "border-neutral-800",
  "border-neutral-900",
  "border-neutral-950",
  "text-neutral-50",
  "text-neutral-100",
  "text-neutral-200",
  "text-neutral-300",
  "text-neutral-400",
  "text-neutral-500",
  "text-neutral-600",
  "text-neutral-700",
  "text-neutral-800",
  "text-neutral-900",
  "text-neutral-950",

  "bg-stone-50",
  "bg-stone-100",
  "bg-stone-200",
  "bg-stone-300",
  "bg-stone-400",
  "bg-stone-500",
  "bg-stone-600",
  "bg-stone-700",
  "bg-stone-800",
  "bg-stone-900",
  "bg-stone-950",
  "border-stone-50",
  "border-stone-100",
  "border-stone-200",
  "border-stone-300",
  "border-stone-400",
  "border-stone-500",
  "border-stone-600",
  "border-stone-700",
  "border-stone-800",
  "border-stone-900",
  "border-stone-950",
  "text-stone-50",
  "text-stone-100",
  "text-stone-200",
  "text-stone-300",
  "text-stone-400",
  "text-stone-500",
  "text-stone-600",
  "text-stone-700",
  "text-stone-800",
  "text-stone-900",
  "text-stone-950",

  "bg-slate-50",
  "bg-slate-100",
  "bg-slate-200",
  "bg-slate-300",
  "bg-slate-400",
  "bg-slate-500",
  "bg-slate-600",
  "bg-slate-700",
  "bg-slate-800",
  "bg-slate-900",
  "bg-slate-950",
  "border-slate-50",
  "border-slate-100",
  "border-slate-200",
  "border-slate-300",
  "border-slate-400",
  "border-slate-500",
  "border-slate-600",
  "border-slate-700",
  "border-slate-800",
  "border-slate-900",
  "border-slate-950",
  "text-slate-50",
  "text-slate-100",
  "text-slate-200",
  "text-slate-300",
  "text-slate-400",
  "text-slate-500",
  "text-slate-600",
  "text-slate-700",
  "text-slate-800",
  "text-slate-900",
  "text-slate-950",

  "bg-gray-50",
  "bg-gray-100",
  "bg-gray-200",
  "bg-gray-300",
  "bg-gray-400",
  "bg-gray-500",
  "bg-gray-600",
  "bg-gray-700",
  "bg-gray-800",
  "bg-gray-900",
  "bg-gray-950",
  "border-gray-50",
  "border-gray-100",
  "border-gray-200",
  "border-gray-300",
  "border-gray-400",
  "border-gray-500",
  "border-gray-600",
  "border-gray-700",
  "border-gray-800",
  "border-gray-900",
  "border-gray-950",
  "text-gray-50",
  "text-gray-100",
  "text-gray-200",
  "text-gray-300",
  "text-gray-400",
  "text-gray-500",
  "text-gray-600",
  "text-gray-700",
  "text-gray-800",
  "text-gray-900",
  "text-gray-950",

  "bg-sky-50",
  "bg-sky-100",
  "bg-sky-200",
  "bg-sky-300",
  "bg-sky-400",
  "bg-sky-500",
  "bg-sky-600",
  "bg-sky-700",
  "bg-sky-800",
  "bg-sky-900",
  "bg-sky-950",
  "border-sky-50",
  "border-sky-100",
  "border-sky-200",
  "border-sky-300",
  "border-sky-400",
  "border-sky-500",
  "border-sky-600",
  "border-sky-700",
  "border-sky-800",
  "border-sky-900",
  "border-sky-950",
  "text-sky-50",
  "text-sky-100",
  "text-sky-200",
  "text-sky-300",
  "text-sky-400",
  "text-sky-500",
  "text-sky-600",
  "text-sky-700",
  "text-sky-800",
  "text-sky-900",
  "text-sky-950",
] as const;
void __twColorSafelist;
