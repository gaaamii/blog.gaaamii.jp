import MainLayout from "../components/feature/MainLayout";

export default function About() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-8 my-16">
        <SectionCard heading="このブログについて">
          <p className="mt-4">
            東京都在住のソフトウェアエンジニアが書いているブログです。個人的な日記やソフトウェア開発周りの雑記を、気が向いたときに書いています。
            <br />
          </p>
          <p className="text-right">
            <ExternalLink href="https://gaaamii.jp">
              筆者詳細はこちら
            </ExternalLink>
          </p>
        </SectionCard>

        <SectionCard heading="フィード配信">
          <p className="mt-2">
            RSSを配信しています。フィードリーダーに登録する際は以下のリンクをお使いください。
          </p>
          <p className="mt-2 text-right">
            <ExternalLink href="https://blog.gaaamii.jp/feed">RSS</ExternalLink>
          </p>
        </SectionCard>

        <SectionCard heading="ソースコード">
          <p className="mt-2">
            ソースコードはこちらです。ブログ画面の実装に興味がある方はご覧ください。
          </p>
          <p className="mt-2 text-right">
            <ExternalLink href="https://github.com/gaaamii/blog.gaaamii.jp">
              gaaamii/blog.gaaamii.jp
            </ExternalLink>
          </p>
        </SectionCard>
      </div>
    </MainLayout>
  );
}

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      className="underline font-bold hover:text-sky-700"
    >
      {children}
    </a>
  );
};

const SectionCard = ({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="p-8 rounded-lg md:border">
      <h2 className="font-bold">{heading}</h2>
      {children}
    </section>
  );
};
