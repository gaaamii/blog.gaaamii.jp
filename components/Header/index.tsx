import Link from 'next/link'
import styles from './styles.module.css'

const Header = () => {
  return (
    <header className={styles.root}>
      <h1 className={styles.title}>
        <Link href="/">gaaamiiのブログ</Link>
      </h1>
      <p className={styles.description}>
        間違ったことを書いている時があります。コメントやTwitter、ブコメなどでご指摘ください
      </p>
    </header>
  )
}

export default Header