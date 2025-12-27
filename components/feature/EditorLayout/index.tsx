import Head from "next/head";
import EditorMain from "../EditorMain/index.tsx";

export const EditorLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Head>
      <title>gaaamiiのブログ</title>
      <meta
        name="description"
        content="間違ったことを書いている時があります。コメントやTwitter、ブコメなどでご指摘ください"
      />
    </Head>

    <EditorMain>{children}</EditorMain>
  </>
);
