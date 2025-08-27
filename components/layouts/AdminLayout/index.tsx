import Head from "next/head";
import Main from "../../Main";
import { Button } from "../../Button";
import { LinkButton } from "../../LinkButton";
import { IconClosedIcon } from "../../icons/IconClosed";
import { PencilSquareIcon } from "../../icons/PencilSquare";
import { CodeBracketIcon } from "../../icons/CodeBracket";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Head>
      <title>gaaamiiのブログ</title>
      <meta
        name="description"
        content="間違ったことを書いている時があります。コメントやTwitter、ブコメなどでご指摘ください"
      />
    </Head>

    <AdminHeader />
    <Main>{children}</Main>
  </>
);

const AdminHeader = () => {
  return (
    <header className="w-full py-4 px-8 border-b">
      <nav className="w-2/3 m-auto flex items-center justify-between">
        <h1 className="flex gap-2">
          <IconClosedIcon /> blog.gaaamii.jp の管理画面
        </h1>
        <ul className="flex justify-end gap-2">
          <AdminHeaderNavItem>
            <LinkButton
              size="sm"
              theme="secondary"
              href="https://github.com/gaaamii/blog.gaaamii.jp"
            >
              <span className="flex items-center gap-1">
                <CodeBracketIcon />
                <span>コード直す</span>
              </span>
            </LinkButton>
          </AdminHeaderNavItem>
          <AdminHeaderNavItem>
            <LinkButton size="sm" theme="primary" href="/posts/new">
              <span className="flex items-center gap-1">
                <PencilSquareIcon />
                <span>なにか書く！</span>
              </span>
            </LinkButton>
          </AdminHeaderNavItem>
        </ul>
      </nav>
    </header>
  );
};

const AdminHeaderNavItem = ({ children }: { children: React.ReactNode }) => {
  return <li className="list-none">{children}</li>;
};
