import type { ReactNode } from "react";
import { Center } from "@gaaamii/ui/Center";
import { Outlet } from "react-router-dom";

type Props = {
  children?: ReactNode;
};

export const AppShell = ({ children }: Props) => {
  return (
    <Center className="max-w-[1040px] px-4 pt-6 pb-12">
      <main>{children ?? <Outlet />}</main>
    </Center>
  );
};
