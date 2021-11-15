import Link, { LinkProps } from 'next/link'
import styles from './styles.module.css'
import React, { AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';
import Image from 'next/image'
import logoImage from '../../public/logo.png';

export const NavigationHeader = () => (
  <header>
    <nav className={styles.navigation}>
      <ul className={styles.navigationList}>
        <NavigationListItem isPrimary prefetch={false} href="/">
          <Image src={logoImage} width={40} height={40} className={classNames(styles.logo)} quality={100} />
          gaaamiiのブログ
        </NavigationListItem>
        <NavigationListItem prefetch={false} href="/about">
          このブログについて
        </NavigationListItem>
        <NavigationListItem target="_blank" prefetch={false} href="https://github.com/gaaamii/blog">
          GitHub
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
      <Link {...linkProps}>
        <a target={target} rel={anchorRelAttribute}>
          {children}
        </a>
      </Link>
    </li>
  )
}
