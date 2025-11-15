import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen w-full pb-10">
      <div>
        <div className="flex gap-3 items-center">
          <h1 className="text-md sm:text-2xl">ページが見つかりませんでした</h1>
          <Image
            src="/logo.png"
            width={40}
            height={40}
            className="rounded-full"
            alt="gaaamii logo"
          />
        </div>
        <p className="text-md sm:text-lg w-full text-right">
          ステータスコード: 404
        </p>
        <div className="mt-14">
          <Link
            className="py-4 text-center block w-full border rounded-md cursor-pointer hover:bg-neutral-100"
            href="/"
          >
            トップに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
