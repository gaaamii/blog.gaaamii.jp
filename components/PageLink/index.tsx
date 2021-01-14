import styles from './styles.module.css'
import Link from 'next/link'

type Props = {
  title: string;
  href: string;
}
const PageLink = (props: Props) => (
  <li className={styles.root}>
    <h2 className={styles.title}>
      <Link href={props.href}><a className={styles.link}>{props.title}</a></Link>
    </h2>
  </li>
)

export default PageLink