import ReactMarkdown from 'react-markdown';
import { decode } from 'js-base64';
import { Post } from '../../models/post';
import styles from './styles.module.css'

export const Article = ({ post }: { post: Post }) => {
  const decodedContent = decode(post.content)

  return (
    <article className={styles.root}>
      <h1>{post.name}</h1>
      <div>
        <ReactMarkdown>
          {decodedContent}
        </ReactMarkdown>
      </div>
    </article >
  )
}
