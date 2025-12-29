import type React from "react";
import type { TwMaxWidth, TwSpacing } from "../tw";
import { cx, twMaxWidthToClass, twSpacingToClass } from "../tw";

type CustomProps = {
  maxWidth?: TwMaxWidth;
  gutter?: TwSpacing;
  centerText?: boolean;
  children?: React.ReactNode;
};

type Props<T extends React.ElementType> = CustomProps & {
  as?: T;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof CustomProps | "as">;

export const Center = <T extends React.ElementType = "div">({
  as,
  maxWidth,
  gutter,
  centerText,
  className,
  style,
  children,
  ...props
}: Props<T>) => {
  const Component = (as ?? "div") as React.ElementType;

  return (
    <Component
      className={cx(
        "mx-auto",
        twMaxWidthToClass(maxWidth),
        twSpacingToClass("px", gutter),
        centerText ? "text-center" : undefined,
        className,
      )}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
};
