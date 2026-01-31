import Head from "next/head";
import Main from "../Main";
import Footer, { FooterLink } from "../Footer";
import { RSSIcon } from "../../ui/icons/RSS";
import { InformationCircleIcon } from "../../ui/icons/InformationCircle";
import { ArrowUpIcon } from "../../ui/icons/ArrowUp";
import { NavigationHeader } from "../NavigationHeader";

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
      <FooterLink href="/about">
        <InformationCircleIcon />
        <span>このブログについて</span>
      </FooterLink>
      <FooterLink href="/feed">
        <RSSIcon />
        <span>RSS</span>
      </FooterLink>
      <FooterLink href="/">
        <ArrowUpIcon />
        <span>トップに戻る</span>
      </FooterLink>
    </Footer>
  </>
);

export default MainLayout;
