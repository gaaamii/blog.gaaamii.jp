import Link, { LinkProps } from 'next/link'
import styles from './styles.module.css'
import React, { AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';

export const NavigationHeader = () => (
  <header>
    <nav className={styles.navigation}>
      <ul className={styles.navigationList}>
        <NavigationListItem isPrimary prefetch={false} href="/">
          <img
            src="/logo.png"
            alt="gaaamiiのアイコン画像"
            width={40}
            height={40}
            className={classNames(styles.logo)}
          />
          gaaamiiのブログ
        </NavigationListItem>
        <NavigationListItem prefetch={false} href="/about">
          このブログについて
        </NavigationListItem>
      </ul>
    </nav>
  </header>
)
type NavigationListItemProps = LinkProps & {
  children: React.ReactNode;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  isPrimary?: boolean;
}
const NavigationListItem = (props: NavigationListItemProps) => {
  const { children, target, isPrimary, ...linkProps } = props
  const anchorRelAttribute = target === "_blank" ? "noopener noreferrer" : undefined

  return (
    <li className={classNames(styles.navigationListItem, {
      [styles["navigationListItem--isPrimary"]]: !!isPrimary
    })}>
      <Link {...linkProps} target={target} rel={anchorRelAttribute}>
        {children}
      </Link>
    </li>
  )
}
