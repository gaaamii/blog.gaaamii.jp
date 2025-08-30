import styles from "./styles.module.css";
import Link from "next/link";
import { Post } from "../../models/post";

type Props = {
  post: Post;
  href: string;
};
export const PostLink = ({ href, post }: Props) => {
  return (
    <h2 className={styles.title}>
      <Link
        href={href}
        className="block w-full m-0 pt-8 pb-4 px-4 sm:rounded-lg sm:py-2 sm:px-3 hover:bg-neutral-200 hover:text-black focus:bg-neutral-200 focus:text-black active:bg-neutral-200 active:text-black dark:active:bg-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-white"
      >
        {post.title}
      </Link>
    </h2>
  );
};
