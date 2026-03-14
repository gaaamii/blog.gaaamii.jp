import type React from "react";
import { Box } from "@gaaamii/ui/Box";
import { Center } from "@gaaamii/ui/Center";
import { Cluster } from "@gaaamii/ui/Cluster";
import { Stack } from "@gaaamii/ui/Stack";

type Props = {
  title: string;
  children: React.ReactNode;
};

export const SiteFrame = ({ title, children }: Props) => {
  return (
    <Center as="main" maxWidth="3xl" gutter="4" className="py-8">
      <Stack space="6">
        <Stack as="header" space="4">
          <h1 className="text-3xl font-bold">{title}</h1>
          <Cluster as="nav" space="4" className="text-sm">
            <a href="/" className="underline underline-offset-2">
              Home
            </a>
            <a href="/about" className="underline underline-offset-2">
              About
            </a>
            <a href="/feed.xml" className="underline underline-offset-2">
              RSS
            </a>
          </Cluster>
        </Stack>
        <Box as="section">{children}</Box>
      </Stack>
    </Center>
  );
};
