import Script from 'next/script';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import rehypeRaw from 'rehype-raw';
import styles from './styles.module.css'

type Props = {
  children: string;
}

export const Markdown = ({ children }: Props) => (
  <ReactMarkdown
    components={{
      code: codeComponent,
      script: scriptComponent,
      h2: h2Component,
      h3: h3Component,
      p: pComponent,
      a: aComponent
    }}
    children={children}
    rehypePlugins={[rehypeRaw]}
  />
)

const scriptComponent = props => <Script {...props} />


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
const h2Component = ({ children }) => (
   <h2 className={"font-bold text-xl mt-10"}>{children}</h2>
)
const h3Component = ({ children }) => (
   <h3 className={"font-bold text-lg mt-8 pl-6 border-l-4 border-black"}>{children}</h3>
)
const pComponent = ({ children, node, className, ...props }) => {
   return <p className={"mt-6 leading-8"} {...props}>{children}</p>
}
const aComponent = ({ node, children, href, ...props }) => (
   <a className={"font-bold underline hover:text-sky-600"} href={href} target="blank_" {...props}>{children}</a>
)