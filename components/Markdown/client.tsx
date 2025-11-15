"use client";

import Markdown from "react-markdown";
import { markdownComponents } from "./shared";

export const MarkdownCompiledOnClient = ({
  children,
}: {
  children: string;
}) => {
  return <Markdown components={markdownComponents}>{children}</Markdown>;
};
