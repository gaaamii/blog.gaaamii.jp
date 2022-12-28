import Head from 'next/head'
import Main from '../components/Main/index';
import { NavigationHeader } from '../components/NavigationHeader/index';

export default function About() {
  return (
    <>
      <Head>
        <title>gaaamiiのブログ</title>
        <meta name="description" content="間違ったことを書いている時があります。コメントやTwitter、ブコメなどでご指摘ください" />
      </Head>

      <NavigationHeader />
      <Main>
        <div className="flex flex-col gap-4">
        <SectionCard heading="このブログについて">
          <p className="mt-4">
            東京都在住のソフトウェアエンジニアが書いているブログです。個人的な日記やソフトウェア開発周りの雑記を、気が向いたときに書いています。
            <br />
          </p>
          <p className="text-right">
            <ExternalLink href="https://gaaamii.jp">著者詳細はこちら</ExternalLink>
          </p>
        </SectionCard>

        <SectionCard heading="ご感想・ご指摘等">
           <p className="mt-2">
            スパムが来ると困るのでコメントフォームは設置していません。
            <br />ご感想やご指摘をお寄せいだたく際は、お手数ですが記事のリンクと一緒にTwitterでメンションをください。
            <p className="mt-2 text-right">
              <ExternalLink href="https://twitter.com/gaaamii">@gaaamii</ExternalLink>
            </p>
          </p>
        </SectionCard>

        <SectionCard heading="ソースコード">
           <p className="mt-2">ソースコードはこちらです。ブログ画面の実装に興味がある方はご覧ください。</p>
           <p className="mt-2 text-right">
             <ExternalLink href="https://github.com/gaaamii/blog.gaaamii.jp">
               gaaamii/blog.gaaamii.jp
             </ExternalLink>
           </p>
        </SectionCard>
        </div>
      </Main>
    </>
  )
}

const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a
      href={href} target="_blank"
      className="underline font-bold hover:text-sky-700"
    >
      {children}
    </a>
  )
}

const SectionCard = ({ heading, children }: { heading: string; children: React.ReactNode }) => {
  return (
    <section className="md:border-2 py-4 px-8 rounded-lg">
      <h2 className='font-bold'>{heading}</h2>
      {children}
    </section>
  )
}
