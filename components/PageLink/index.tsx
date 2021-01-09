import styles from './styles.module.css'
import Link from 'next/link'

type Props = {
  title: string;
  href: string;
}
const PageLink = (props: Props) => (
  <li className={styles.root}>
    <h2>
      <Link href={props.href}>{props.title}</Link>
    </h2>
  </li>
)

export default PageLink