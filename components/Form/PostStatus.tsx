import type { PostStatus as PostStatusType } from "../../models/post";

export const PostStatus = ({ status }: { status: PostStatusType }) => {
  return (
    <div className="appearance-none border border-slate-500 px-6 pt-1 pb-1 text-sm rounded-sm">
      {status === "draft" ? <div>下書き</div> : <div>公開済み</div>}
    </div>
  );
};
