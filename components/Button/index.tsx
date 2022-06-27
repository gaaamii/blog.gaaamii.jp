import { ButtonHTMLAttributes } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  theme?: "primary" | "secondary";
}


export const Button = (props: Props) => (
  <button {...props} className={getClassNames(props.theme)}>
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
    "disabled:bg-slate-700"
  ]

  const primaryClassNames = [
    "bg-indigo-600",
    "text-white",
    "hover:bg-indigo-800",
  ]
  const secondaryClassNames = [
    "bg-slate-200",
    "text-black",
    "hover:bg-slate-300",
  ]

  const themeClassNames = theme === "primary" ? primaryClassNames : secondaryClassNames

  return [
    ...baseClassNames,
    ...themeClassNames
  ].join(" ")
}