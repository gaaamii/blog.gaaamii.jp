import type { ReactNode } from "react";
import type { Post } from "@gaaamii/domain/post";
import { Center } from "@gaaamii/ui/Center";
import { Stack } from "@gaaamii/ui/Stack";
import { getLocalizedDateString } from "@gaaamii/utils/datetime";

export const PostArticle = ({
  post,
  children,
}: {
  post: Post;
  children: ReactNode;
}) => {
  return (
    <Center as="article" maxWidth="3xl" className="pb-8">
      <Stack space="8">
        <div>
          <time className="text-sm text-gray-500">
            {getLocalizedDateString(post.published_at)}
          </time>
          <h2 className="mt-4 text-[2rem] leading-[1.25]">
            {post.title}
          </h2>
        </div>
        <div>{children}</div>
      </Stack>
    </Center>
  );
};
