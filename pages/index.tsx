import { GetStaticPropsContext } from 'next'
import Head from 'next/head'
import Header from '../components/Header/index';
import Main from '../components/Main/index';
import PageLink from '../components/PageLink/index';

type Content = {
  name: string;
}
type Props = {
  contents?: Content[];
}

export default function Home(props: Props) {
  return (
    <>
      <Head>
        <title>gaaamiiのブログ</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="間違ったことを書いている時があります。コメントやTwitter、ブコメなどでご指摘ください" />
      </Head>

      <Header />

      <Main>
        <Contents {...props} />
      </Main>
    </>
  )
}

const Contents = (props: Props) => {
  if (!props.contents) {
    return (
      <div>読み込み中...</div>
    )
  }

  return (
    <ul>
      {props.contents.map(content => <PageLink href={content.name} title={content.name} />)}
    </ul>
  )
}

const API_HOST = `https://api.github.com/repos/gaaamii/blog/contents/contents`

export async function getStaticProps(context: GetStaticPropsContext) {
  let contents = []

  const res = await fetch(API_HOST)


  if (res.ok) {
    const json = await res.json()

    contents = json.map(content => ({ name: content.name }))
  }

  return {
    props: {
      contents,
    },
    revalidate: 1,
  }
}
