import styles from "./styles.module.css";
import React from "react";

type CustomProps = {
  padding?: string;
  borderWidth?: string;
  borderColor?: string;
  radius?: string;
  backgroundColor?: string;
  color?: string;
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
  borderColor,
  radius,
  backgroundColor,
  color,
  className,
  style,
  children,
  ...props
}: Props<T>) => {
  const Component = (as ?? "div") as React.ElementType;

  return (
    <Component
      className={[styles.root, className].filter(Boolean).join(" ")}
      style={{
        ...(style as React.CSSProperties),
        ["--box-padding" as any]: padding,
        ["--box-border-width" as any]: borderWidth,
        ["--box-border-color" as any]: borderColor,
        ["--box-radius" as any]: radius,
        ["--box-background-color" as any]: backgroundColor,
        ["--box-color" as any]: color,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

