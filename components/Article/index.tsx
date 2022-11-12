import { Post } from '../../models/post';
import styles from './styles.module.css'
import { getLocalizedDateString } from '../../utils/datetime';
import { Markdown } from '../Markdown';

export const Article = ({ post }: { post: Post }) => {
  return (
    <article className={styles.root}>
      <time>{getLocalizedDateString(post.published_at)}</time>
      <h1 className="mt-4 text-2xl font-bold">{post.title}</h1>
      <div className="mt-8">
        <Markdown>{post.body}</Markdown>
      </div>
    </article >
  )
}
