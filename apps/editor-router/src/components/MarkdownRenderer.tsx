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
      <code
        style={{
          padding: "0.2em 0.45em",
          borderRadius: "8px",
          backgroundColor: "#e5e7eb",
          fontSize: "0.95em",
        }}
      >
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
      <pre
        style={{
          overflow: "auto",
          padding: "16px",
          borderRadius: "16px",
          backgroundColor: "#111827",
          color: "#f9fafb",
        }}
      >
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
  <h2 style={{ marginTop: "40px", marginBottom: 0, fontSize: "1.4rem" }}>
    {children}
  </h2>
);

const Heading3 = ({ children }: { children?: React.ReactNode }) => (
  <h3
    style={{
      marginTop: "32px",
      marginBottom: 0,
      paddingLeft: "16px",
      borderLeft: "4px solid #111827",
      fontSize: "1.15rem",
    }}
  >
    {children}
  </h3>
);

const Paragraph = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
}) => (
  <p
    style={{ marginTop: "16px", marginBottom: 0, lineHeight: 1.9 }}
    {...props}
  >
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
    style={{ fontWeight: 700, textDecoration: "underline", color: "#0369a1" }}
    {...props}
  >
    {children}
  </a>
);

const UnorderedList = ({ children }: { children?: React.ReactNode }) => (
  <ul style={{ marginTop: "16px", paddingLeft: "20px" }}>{children}</ul>
);

const ListItem = ({ children }: { children?: React.ReactNode }) => (
  <li style={{ marginTop: "8px", lineHeight: 1.9 }}>{children}</li>
);
