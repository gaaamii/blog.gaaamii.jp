import { InputHTMLAttributes } from "react";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { className, ...rest } = props;

  return (
    <input
      {...rest}
      className={["p-2 border rounded-sm", className].filter(Boolean).join(" ")}
    />
  );
};
