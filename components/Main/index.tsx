import { JSXElementConstructor } from 'react'
import styles from './styles.module.css'

const Main = ({ children }: { children: React.ReactElement }) => (
  <main className={styles.root}>
    {children}
  </main>
)

export default Main