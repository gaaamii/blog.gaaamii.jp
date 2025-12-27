import styles from "./styles.module.css";
import React from "react";

type CustomProps = {
  space?: string;
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  children?: React.ReactNode;
};

type Props<T extends React.ElementType> = CustomProps & {
  as?: T;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof CustomProps | "as">;

export const Cluster = <T extends React.ElementType = "div">({
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
      className={[styles.root, className].filter(Boolean).join(" ")}
      style={{
        ...(style as React.CSSProperties),
        ["--cluster-space" as any]: space,
        ["--cluster-align" as any]: align,
        ["--cluster-justify" as any]: justify,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

