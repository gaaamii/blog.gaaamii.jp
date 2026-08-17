import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

type Props = {
  children?: ReactNode;
};

const shellStyle = {
  maxWidth: "1040px",
  margin: "0 auto",
  padding: "24px 16px 48px",
};

export const AppShell = ({ children }: Props) => {
  return (
    <div style={shellStyle}>
      <main>{children ?? <Outlet />}</main>
    </div>
  );
};
