import { ButtonHTMLAttributes } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  theme?: "primary" | "secondary";
}


export const Button = (props: Props) => (
  <button {...props} className={getClassNames(props.theme || "primary")}>
    {props.children}
  </button>
)

const getClassNames = (theme: Props["theme"]) => {
  const baseClassNames = [
    "px-12",
    "py-3",
    "rounded-md",
    "cursor-pointer",
    "transition-colors",
  ]

  const primaryClassNames = [
    "bg-sky-600",
    "text-white",
    "hover:bg-sky-800",
    "disabled:bg-sky-900",
    "disabled:text-white"
  ]

  const secondaryClassNames = [
    "bg-slate-200",
    "text-black",
    "hover:bg-slate-300",
    "disabled:bg-slate-400",
    "disabled:text-white"
  ]

  const themeClassNames = theme === "primary" ? primaryClassNames : secondaryClassNames

  return [
    ...baseClassNames,
    ...themeClassNames
  ].join(" ")
}