import type React from "react";
import {
  cx,
  twBorderWidthToClass,
  twColorToClass,
  twRadiusToClass,
  twSpacingToClass,
} from "../tw";
import type { TwBorderWidth, TwColor, TwRadius, TwSpacing } from "../tw";

type CustomProps = {
  padding?: TwSpacing;
  borderWidth?: TwBorderWidth;
  radius?: TwRadius;
  borderColor?: TwColor;
  backgroundColor?: TwColor;
  colorClassName?: string;
  children?: React.ReactNode;
};

type Props<T extends React.ElementType> = CustomProps & {
  as?: T;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof CustomProps | "as">;

export const Box = <T extends React.ElementType = "div">({
  as,
  padding,
  borderWidth,
  radius,
  borderColor,
  backgroundColor,
  colorClassName,
  className,
  style,
  children,
  ...props
}: Props<T>) => {
  const Component = (as ?? "div") as React.ElementType;

  return (
    <Component
      className={cx(
        twSpacingToClass("p", padding),
        twBorderWidthToClass(borderWidth),
        twRadiusToClass(radius),
        twColorToClass("border", borderColor),
        twColorToClass("bg", backgroundColor),
        colorClassName,
        className,
      )}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
};
