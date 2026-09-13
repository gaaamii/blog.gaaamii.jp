import { Post } from "@gaaamii/domain/post";
import styles from "./styles.module.css";
import { getLocalizedDateString } from "@gaaamii/utils/datetime";

export const Article = ({
  post,
  children,
}: {
  post: Post;
  children: React.ReactNode;
}) => {
  return (
    <article className={`${styles.root} pt-2 px-6 pb-20`}>
      <time>{getLocalizedDateString(post.published_at)}</time>
      <h1 className="mt-4 text-2xl font-bold">{post.title}</h1>
      <div className="mt-8">{children}</div>
    </article>
  );
};
