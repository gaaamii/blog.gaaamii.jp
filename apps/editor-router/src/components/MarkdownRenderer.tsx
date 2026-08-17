import { useEffect, useState } from "react";
import Markdown from "react-markdown";

export const MarkdownRenderer = ({ children }: { children: string }) => {
  return (
    <Markdown
      components={{
        code: CodeComponent,
        h2: Heading2,
        h3: Heading3,
        p: Paragraph,
        a: Anchor,
        ul: UnorderedList,
        li: ListItem,
      }}
    >
      {children}
    </Markdown>
  );
};

const CodeComponent = ({
  inline,
  className,
  children,
}: {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}) => {
  const classNameString = className ?? "";
  const match = /language-(\w+)/.exec(classNameString);

  if (inline || !match) {
    return (
      <code className="rounded-lg bg-gray-200 px-[0.45em] py-[0.2em] text-[0.95em]">
        {children}
      </code>
    );
  }

  return (
    <CodeBlock
      language={match[1]}
      value={String(children ?? "").replace(/\n$/, "")}
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
      <pre className="overflow-auto rounded-2xl bg-gray-900 p-4 text-gray-50">
        <code>{value}</code>
      </pre>
    );
  }

  return (
    <SyntaxHighlighter style={syntaxStyle} language={language} PreTag="div">
      {value}
    </SyntaxHighlighter>
  );
};

const Heading2 = ({ children }: { children?: React.ReactNode }) => (
  <h2 className="mt-10 text-[1.4rem]">{children}</h2>
);

const Heading3 = ({ children }: { children?: React.ReactNode }) => (
  <h3 className="mt-8 border-l-4 border-black pl-4 text-[1.15rem]">
    {children}
  </h3>
);

const Paragraph = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
}) => (
  <p className="mt-4 leading-[1.9]" {...props}>
    {children}
  </p>
);

const Anchor = ({
  children,
  href,
  ...props
}: {
  children?: React.ReactNode;
  href?: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="font-bold text-sky-700 underline"
    {...props}
  >
    {children}
  </a>
);

const UnorderedList = ({ children }: { children?: React.ReactNode }) => (
  <ul className="mt-4 pl-5">{children}</ul>
);

const ListItem = ({ children }: { children?: React.ReactNode }) => (
  <li className="mt-2 leading-[1.9]">{children}</li>
);
