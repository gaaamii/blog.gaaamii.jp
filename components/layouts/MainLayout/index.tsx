import Main from "../../Main";
import Footer, { FooterLink } from "../../Footer";
import { RSSIcon } from "../../icons/RSS";
import { InformationCircleIcon } from "../../icons/InformationCircle";
import { ArrowUpIcon } from "../../icons/ArrowUp";
import { NavigationHeader } from "../../NavigationHeader";

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
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
