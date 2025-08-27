import { useState } from "react";
import { PostStatus } from "../models/post";
import { useAuthorization } from "../hooks/useAuthorization";
import { useFetchPostsAsAdmin } from "../hooks/useFetchPostsAsAdmin";
import PostLink from "../components/PostLink/index";
import { AdminLayout } from "../components/layouts/AdminLayout";

export default function Admin() {
  const { isAuthorized } = useAuthorization();

  return isAuthorized ? (
    <AdminLayout>
      <PostSection />
    </AdminLayout>
  ) : null;
}

const PostSection = () => {
  const { postStatus, onChangeStatus } = usePostSelect();

  return (
    <section className="mt-8 border p-8 rounded-md">
      <h2 className="text-lg font-bold">記事一覧</h2>
      <div className="flex gap-4 mt-4 items-center">
        <PostFilter value={postStatus} onChange={onChangeStatus} />
      </div>
      <div className="mt-8">
        <PostList postStatus={postStatus} />
      </div>
    </section>
  );
};

const usePostSelect = () => {
  const [postStatus, setPostStatus] = useState<PostStatus | null>("draft");
  const onChangeStatus = (e: any) => {
    if (e.target.value === "published" || e.target.value === "draft") {
      setPostStatus(e.target.value);
    } else {
      setPostStatus(null);
    }
  };

  return {
    postStatus,
    onChangeStatus,
  };
};

const PostFilter = ({
  onChange,
  value,
}: {
  onChange: any;
  value: PostStatus | null;
}) => {
  return (
    <>
      <label htmlFor="post-select">公開状態</label>
      <PostSelect onChange={onChange} value={value} />
    </>
  );
};
const PostSelect = ({
  onChange,
  value,
}: {
  onChange: any;
  value: PostStatus | null;
}) => {
  return (
    <select
      id="post-select"
      className="border border-slate-500 h-8 w-40 rounded"
      onChange={onChange}
    >
      <option selected={value === null} value="all">
        すべて
      </option>
      <option selected={value === "draft"} value="draft">
        下書き
      </option>
      <option selected={value === "published"} value="published">
        公開済み
      </option>
    </select>
  );
};

const PostList = ({ postStatus }: { postStatus: PostStatus | null }) => {
  const { isLoading, posts } = useFetchPostsAsAdmin(postStatus);

  if (isLoading) {
    return <p className="text-center bg-neutral-200 py-2">読込中...</p>;
  }

  return (
    posts && (
      <div>
        {posts.map((post) => (
          <PostLink {...post} editable key={post.id} />
        ))}
      </div>
    )
  );
};
