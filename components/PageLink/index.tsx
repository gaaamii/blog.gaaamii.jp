import styles from './styles.module.css'
import Link from 'next/link'
import { getDateString } from '../../utils/datetime';

type Props = {
  title: string;
  href: string;
  published_at: string;
}
const PageLink = (props: Props) => (
  <li className={styles.root}>
    <time className={styles.time}>{getDateString(props.published_at)}</time>
    <h2 className={styles.title}>
      <Link href={props.href}><a className={styles.link}>{props.title}</a></Link>
    </h2>
  </li>
)

export default PageLink