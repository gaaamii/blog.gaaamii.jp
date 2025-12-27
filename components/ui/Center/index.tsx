import styles from "./styles.module.css";
import React from "react";

type CustomProps = {
  maxWidth?: string;
  gutter?: string;
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
      className={[
        styles.root,
        centerText ? styles.centerText : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        ...(style as React.CSSProperties),
        ["--center-max-width" as any]: maxWidth,
        ["--center-gutter" as any]: gutter,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

