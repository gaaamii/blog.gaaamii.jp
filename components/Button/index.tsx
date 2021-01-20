import { ButtonHTMLAttributes } from "react"
import styles from './styles.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export const Button = (props: Props) => (
  <button {...props} className={styles.root}>
    {props.children}
  </button>
)