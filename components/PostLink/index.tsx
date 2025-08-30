import Link from "next/link";
import { Post } from "../../models/post";

type Props = {
  post: Post;
  href: string;
};
export const PostLink = ({ href, post }: Props) => {
  return (
    <h2 className="font-bold text-lg">
      <Link
        href={href}
        className="block m-0 py-4 px-4 rounded-lg sm:py-2 hover:bg-neutral-200 hover:text-black focus:text-black active:text-black dark:active:bg-neutral-800 dark:hover:bg-neutral-800 dark:focus:text-white dark:hover:text-white"
      >
        {post.title}
      </Link>
    </h2>
  );
};
