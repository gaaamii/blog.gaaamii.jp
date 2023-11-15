import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import styles from "./styles.module.css";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type Props = {
  mdxSource: MDXRemoteSerializeResult;
};

export const MarkdownCompiledOnServer = ({ mdxSource }: Props) => {
  return (
    <MDXRemote
      {...mdxSource}
      components={{
        code: codeComponent,
        h2: h2Component,
        h3: h3Component,
        p: pComponent,
        a: aComponent,
        ul: ulComponent,
        li: liComponent,
      }}
    />
  );
};

export const MarkdownCompiledOnClient = ({
  children,
}: {
  children: string;
}) => {
  return (
    <ReactMarkdown
      children={children}
      components={{
        code: codeComponent,
        h2: h2Component,
        h3: h3Component,
        p: pComponent,
        a: aComponent,
        ul: ulComponent,
        li: liComponent,
      }}
    />
  );
};

import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
const codeComponent = ({ node, inline, className, children, ...props }) => {
  // NOTE: CodeComponent's className is typed as unknown
  const classNameString = className as string;
  const match = /language-(\w+)/.exec(classNameString || "");
  return !inline && match ? (
    <SyntaxHighlighter
      style={a11yDark}
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={styles.plainCode}>{children}</code>
  );
};
const h2Component = ({ children }) => (
  <h2 className={"font-bold text-xl mt-10"}>{children}</h2>
);
const h3Component = ({ children }) => (
  <h3 className={"font-bold text-lg mt-8 pl-6 border-l-4 border-black"}>
    {children}
  </h3>
);
const pComponent = ({ children, node, className, ...props }) => (
  <p className={className || "mt-4 leading-8"} {...props}>
    {children}
  </p>
);
const aComponent = ({ node, children, href, ...props }) => (
  <a
    className={"font-bold underline hover:text-sky-600"}
    href={href}
    target="blank_"
    {...props}
  >
    {children}
  </a>
);

const ulComponent = ({ node, children, ...props }) => (
  <ul className={"mt-4"} {...props}>
    {children}
  </ul>
);

const liComponent = ({ node, children, ...props }) => (
  <li className={"mt-1 ml-5 leading-8"} {...props}>
    {children}
  </li>
);
