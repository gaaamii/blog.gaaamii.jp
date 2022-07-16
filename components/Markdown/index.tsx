import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import styles from './styles.module.css'

type Props = {
  children: string;
}

export const Markdown = ({ children }: Props) => (
  <ReactMarkdown components={{ code: codeComponent }} children={children} />
)

const codeComponent = ({ node, inline, className, children, ...props }) => {
  // NOTE: CodeComponent's className is typed as unknown
  const classNameString = className as string

  const match = /language-(\w+)/.exec(classNameString || '')
  return !inline && match ? (
    <SyntaxHighlighter
      language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
  ) : (
    <code className={styles.plainCode}>{children}</code>
  )
}