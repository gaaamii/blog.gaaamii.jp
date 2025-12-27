import type { PostStatus as PostStatusType } from "../../../models/post";
import { CheckCircleIcon } from "../../ui/icons/CheckCircle";

export const PostStatus = ({ status }: { status: PostStatusType }) => {
  return status === "draft" ? <DraftStatus /> : <PublishedStatus />;
};

const DraftStatus = () => {
  return <StatusBox className="border-slate-500">下書き</StatusBox>;
};

const PublishedStatus = () => {
  return (
    <StatusBox className="border-green-700 text-green-700">
      <div className="flex items-center gap-2 ml-[-8]">
        <CheckCircleIcon />
        公開済み
      </div>
    </StatusBox>
  );
};

const StatusBox = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div
      className={`font-bold appearance-none border px-6 pt-1 pb-1 text-sm rounded-md ${className}`}
    >
      {children}
    </div>
  );
};
