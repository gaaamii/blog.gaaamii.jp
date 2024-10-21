import Link, { LinkProps } from "next/link";
import styles from "./styles.module.css";
import React, { AnchorHTMLAttributes } from "react";
import classNames from "classnames";
import { Avatar } from "../Avatar";

export const NavigationHeader = () => (
  <header>
    <nav className="w-full border-b-2 dark:border-b-stone-500">
      <ul className={styles.navigationList}>
        <NavigationListItem isPrimary prefetch={false} href="/">
          <Avatar />
          gaaamiiのブログ
        </NavigationListItem>
        <NavigationListItem prefetch={false} href="/about">
          このブログについて
        </NavigationListItem>
      </ul>
    </nav>
  </header>
);
type NavigationListItemProps = LinkProps & {
  children: React.ReactNode;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  isPrimary?: boolean;
};
const NavigationListItem = (props: NavigationListItemProps) => {
  const { children, target, isPrimary, ...linkProps } = props;
  const anchorRelAttribute =
    target === "_blank" ? "noopener noreferrer" : undefined;

  return (
    <li
      className={classNames(styles.navigationListItem, {
        [styles["navigationListItem--isPrimary"]]: !!isPrimary,
      })}
    >
      <Link {...linkProps} target={target} rel={anchorRelAttribute}>
        {children}
      </Link>
    </li>
  );
};
