import { GetStaticPropsContext } from 'next'
import Head from 'next/head'
import Header from '../components/Header/index';
import Main from '../components/Main/index';
import PageLink from '../components/PageLink/index';
import { Post } from '../models/post';

type Content = {
  name: string;
}
type Props = {
  contents?: Post[];
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
        <Posts {...props} />
      </Main>
    </>
  )
}

const Posts = (props: Props) => {
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
  let posts = []

  const res = await fetch(API_HOST)


  if (res.ok) {
    const json = await res.json()

    posts = json.map(post => ({ name: post.name }))
  }

  return {
    props: {
      posts,
    },
    revalidate: 1,
  }
}
