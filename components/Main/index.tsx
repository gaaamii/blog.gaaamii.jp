import styles from './styles.module.css'

const Main = ({ children }: { children: React.ReactNode }) => (
  <main className={styles.root}>
    {children}
  </main>
)

export default Main