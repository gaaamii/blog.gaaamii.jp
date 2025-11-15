import Footer, { FooterLink } from "../../Footer";
import { RSSIcon } from "../../icons/RSS";
import { InformationCircleIcon } from "../../icons/InformationCircle";
import { ArrowUpIcon } from "../../icons/ArrowUp";
import { EditorNavigationHeader } from "./EditorNavigationHeader";
import EditorMain from "../../EditorMain/index.tsx";

export const EditorLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <EditorNavigationHeader />
    <EditorMain>{children}</EditorMain>
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
