import Link from 'next/link'
import styles from './styles.module.css'
import { SITE_INFO } from '../../config/settings';

const Header = () => {
  return (
    <header className={styles.root}>
      <h1 className={styles.title}>
        <Link href="/">{SITE_INFO.title}</Link>
      </h1>
      <p className={styles.description}>
        {SITE_INFO.description}
      </p>
    </header>
  )
}

export default Header