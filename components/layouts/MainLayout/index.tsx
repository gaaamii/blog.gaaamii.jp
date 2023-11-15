import Head from "next/head";
import { NavigationHeader } from "../../NavigationHeader";
import Main from "../../Main";
import Footer from "../../Footer";
import Link from "next/link";

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Head>
      <title>gaaamiiのブログ</title>
      <meta
        name="description"
        content="間違ったことを書いている時があります。コメントやTwitter、ブコメなどでご指摘ください"
      />
    </Head>

    <NavigationHeader />
    <Main>{children}</Main>
    <Footer>
      <Link href="/">トップに戻る</Link>
      <Link href="/about">このブログについて</Link>
    </Footer>
  </>
);

export default MainLayout;
