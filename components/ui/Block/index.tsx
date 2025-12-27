import styles from './styles.module.css'
import classNames from 'classnames'

type Spacing = "wide" | "narrow"
type Align = "left" | "right"

type Props = {
  spacing?: Spacing;
  children: React.ReactNode;
  align?: Align;
}

export const Block = (props: Props) => {
  return (
    <div className={
      classNames(styles.root, {
        [styles.wide]: props.spacing === "wide",
        [styles.narrow]: props.spacing === "narrow",
        [styles.alignLeft]: props.align === "left",
        [styles.alignRight]: props.align === "right",
      })
    }>
      {props.children}
    </div>
  )
}