import styles from "./styles.module.css";

const EditorMain = ({ children }: { children: React.ReactNode }) => (
  <main className={`${styles.root} mx-auto sm:mt-2 sm:mb-8`}>{children}</main>
);

export default EditorMain;
