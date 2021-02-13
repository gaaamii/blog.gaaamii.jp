import ReactMarkdown from 'react-markdown';
import { Post } from '../../models/post';
import styles from './styles.module.css'
import { getLocalizedDateString } from '../../utils/datetime';

export const Article = ({ post }: { post: Post }) => {
  return (
    <article className={styles.root}>
      <time>{getLocalizedDateString(post.published_at)}</time>
      <h1 className={styles.title}>{post.title}</h1>
      <div>
        <ReactMarkdown>
          {post.body}
        </ReactMarkdown>
      </div>
    </article >
  )
}
