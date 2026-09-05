import styles from "./styles.module.css";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Markdown from "react-markdown";
import { useEffect, useState } from "react";

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
    <Markdown
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

const codeComponent = ({ node, inline, className, children, ...props }) => {
  // NOTE: CodeComponent's className is typed as unknown
  const classNameString = className as string;
  const match = /language-(\w+)/.exec(classNameString || "");
  if (inline || !match) {
    return <code className={styles.plainCode}>{children}</code>;
  }

  return (
    <CodeBlock
      language={match[1]}
      value={String(children).replace(/\n$/, "")}
    />
  );
};

const CodeBlock = ({ language, value }: { language: string; value: string }) => {
  const [SyntaxHighlighter, setSyntaxHighlighter] =
    useState<null | React.ComponentType<any>>(null);
  const [syntaxStyle, setSyntaxStyle] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      import("react-syntax-highlighter/dist/esm/prism").then(
        (module) => module.default,
      ),
      import("react-syntax-highlighter/dist/esm/styles/prism/a11y-dark").then(
        (module) => module.default,
      ),
    ]).then(([Highlighter, style]) => {
      if (!isMounted) {
        return;
      }

      setSyntaxHighlighter(() => Highlighter);
      setSyntaxStyle(style);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!SyntaxHighlighter || !syntaxStyle) {
    return (
      <pre className="my-4 overflow-auto rounded bg-neutral-900 p-4 text-sm">
        <code className="text-neutral-100">{value}</code>
      </pre>
    );
  }

  return (
    <SyntaxHighlighter style={syntaxStyle} language={language} PreTag="div">
      {value}
    </SyntaxHighlighter>
  );
};

const h2Component = ({ children }) => (
  <h2 className={"font-bold text-xl mt-10"}>{children}</h2>
);
const h3Component = ({ children }) => (
  <h3
    className={
      "font-bold text-lg mt-8 pl-6 border-l-4 border-black dark:border-white"
    }
  >
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
