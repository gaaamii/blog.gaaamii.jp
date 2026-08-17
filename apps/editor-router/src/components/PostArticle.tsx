import type { ReactNode } from "react";
import type { Post } from "@gaaamii/domain/post";
import { getLocalizedDateString } from "@gaaamii/utils/datetime";

export const PostArticle = ({
  post,
  children,
}: {
  post: Post;
  children: ReactNode;
}) => {
  return (
    <article
      style={{
        maxWidth: "760px",
        margin: "0 auto",
        paddingBottom: "32px",
      }}
    >
      <time style={{ fontSize: "14px", color: "#6b7280" }}>
        {getLocalizedDateString(post.published_at)}
      </time>
      <h2
        style={{
          marginTop: "16px",
          marginBottom: 0,
          fontSize: "2rem",
          lineHeight: 1.25,
        }}
      >
        {post.title}
      </h2>
      <div style={{ marginTop: "32px" }}>{children}</div>
    </article>
  );
};
