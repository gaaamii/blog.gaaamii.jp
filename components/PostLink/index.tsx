import styles from './styles.module.css'
import Link from 'next/link'
import { getLocalizedDateString } from '../../utils/datetime';
import { Post } from '../../models/post';

type Props = Post & {
  editable?: boolean;
}
const PostLink = (props: Props) => {
  const { pageHref, editPageHref } = getPageHrefs(props)

  return (
    <li className={styles.root}>
      <time className={styles.time}>{getLocalizedDateString(props.published_at)}</time>
      <h2 className={styles.title}>
        <Link href={pageHref} className={styles.link}>
          {props.title}
        </Link>
      </h2>
      {
        editPageHref && (
          <Link href={editPageHref}>
            <span className="underline cursor-pointer">編集する</span>
          </Link>
        )
      }
    </li>
  )
}

const getPageHrefs = (props: Props) => {
  return props.editable
    ? { pageHref: `/admin/posts/${props.id}`, editPageHref: `/posts/${props.id}/edit` }
    : { pageHref: `/posts/${props.id}`, editPageHref: null }
}

export default PostLink