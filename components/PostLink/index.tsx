import styles from "./styles.module.css";
import Link from "next/link";
import { getLocalizedDateString } from "../../utils/datetime";
import { Post } from "../../models/post";

type Props = Post & {
  editable?: boolean;
};
const PostLink = (props: Props) => {
  const { id } = props;
  const { pageHref, editPageHref } = getPageHrefs(props);

  return (
    <li
      className="mt-0 sm:mt-4 relative list-none lg:flex items-center gap-1"
      id={`post-${id}`}
    >
      <time className={styles.time}>
        {getLocalizedDateString(props.published_at)}
      </time>
      <h2 className={styles.title}>
        <Link
          href={pageHref}
          className="block w-full m-0 pt-8 pb-4 px-4 sm:rounded-lg sm:py-2 sm:px-3 hover:bg-neutral-200 hover:text-black focus:bg-neutral-200 focus:text-black active:bg-neutral-200 active:text-black dark:active:bg-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-white"
        >
          {props.title}
        </Link>
      </h2>
      {editPageHref && (
        <Link href={editPageHref}>
          <span className="underline cursor-pointer">編集する</span>
        </Link>
      )}
    </li>
  );
};

const getPageHrefs = (props: Props) => {
  return props.editable
    ? {
        pageHref: `/admin/posts/${props.id}`,
        editPageHref: `/posts/${props.id}/edit`,
      }
    : { pageHref: `/posts/${props.id}`, editPageHref: null };
};

export default PostLink;
