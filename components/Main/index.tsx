import styles from "./styles.module.css";

const Main = ({ children }: { children: React.ReactNode }) => (
  <main className={`${styles.root} mx-auto sm:my-12`}>{children}</main>
);

export default Main;
