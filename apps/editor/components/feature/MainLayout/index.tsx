import Head from "next/head";
import Main from "../Main";
import Footer, { FooterLink } from "../Footer";
import { RSSIcon } from "@gaaamii/ui/icons/RSS";
import { InformationCircleIcon } from "@gaaamii/ui/icons/InformationCircle";
import { ArrowUpIcon } from "@gaaamii/ui/icons/ArrowUp";
import { NavigationHeader } from "../NavigationHeader";

const siteRoot = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.gaaamii.jp";

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
      <FooterLink href={`${siteRoot}/about`}>
        <InformationCircleIcon />
        <span>このブログについて</span>
      </FooterLink>
      <FooterLink href={`${siteRoot}/feed`}>
        <RSSIcon />
        <span>RSS</span>
      </FooterLink>
      <FooterLink href={siteRoot}>
        <ArrowUpIcon />
        <span>トップに戻る</span>
      </FooterLink>
    </Footer>
  </>
);

export default MainLayout;
