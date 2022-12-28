import styles from './styles.module.css'
import Link from 'next/link'
import { getLocalizedDateString } from '../../utils/datetime';
import { Post } from '../../models/post';

type Props = Post & {
  editable?: boolean;
}
const PostLink = (props: Props) => (
  <li className={styles.root}>
    <time className={styles.time}>{getLocalizedDateString(props.published_at)}</time>
    <h2 className={styles.title}>
      <Link href={`/posts/${props.id}`} prefetch={false}>
        <a className={styles.link}>{props.title}</a>
      </Link>
    </h2>
    {
      props.editable && (
        <Link href={`/posts/${props.id}/edit`}>
          <span className="underline cursor-pointer">編集する</span>
        </Link>
      )
    }
  </li>
)

export default PostLink