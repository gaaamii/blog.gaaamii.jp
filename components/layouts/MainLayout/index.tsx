import Head from "next/head";
import { NavigationHeader } from "../../NavigationHeader";
import Main from "../../Main";
import Footer, { FooterLink } from "../../Footer";
import Link from "next/link";
import { RSSIcon } from "../../icons/RSS";
import { InformationCircleIcon } from "../../icons/InformationCircle";
import { ArrowUpIcon } from "../../icons/ArrowUp";

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
