import { PostStatus } from '../../models/post';

export const PostStatusSelect = ({ status }: { status: PostStatus }) => {
  return (
    <select disabled className="appearance-none border border-slate-500 px-6 pt-1 pb-1 text-sm rounded-sm">
      {
        status === "draft"
          ?
          <option>下書き</option>
          :
          <option>公開済み</option>
      }
    </select>
  )
}
