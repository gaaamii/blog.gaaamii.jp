import { TextareaHTMLAttributes } from "react";

export const Textarea = (
  props: TextareaHTMLAttributes<HTMLTextAreaElement>,
) => {
  const { className, ...rest } = props;

  return (
    <textarea
      {...rest}
      className={["p-2 border rounded-sm", className].filter(Boolean).join(" ")}
    />
  );
};
