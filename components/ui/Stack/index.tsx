import type React from "react";
import type { TwAlign, TwJustify, TwSpacing } from "../tw";
import {
  cx,
  twAlignToItemsClass,
  twJustifyToClass,
  twSpacingToClass,
} from "../tw";

type CustomProps = {
  space?: TwSpacing;
  align?: TwAlign;
  justify?: TwJustify;
  children?: React.ReactNode;
};

type Props<T extends React.ElementType> = CustomProps & {
  as?: T;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof CustomProps | "as">;

export const Stack = <T extends React.ElementType = "div">({
  as,
  space,
  align,
  justify,
  className,
  style,
  children,
  ...props
}: Props<T>) => {
  const Component = (as ?? "div") as React.ElementType;

  return (
    <Component
      className={cx(
        "flex flex-col",
        twSpacingToClass("gap", space),
        twAlignToItemsClass(align),
        twJustifyToClass(justify),
        className,
      )}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
};
