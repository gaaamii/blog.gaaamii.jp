import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeImageSize from "./rehype-plugins/rehype-image-size";
import { markdownComponents } from "./shared";

export function MarkdownCompiledOnServer({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{ mdxOptions: { rehypePlugins: [rehypeImageSize] } }}
      components={markdownComponents}
    />
  );
}
