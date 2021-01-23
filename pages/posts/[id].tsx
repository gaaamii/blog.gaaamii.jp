import { GetStaticPropsContext } from 'next'
import Head from 'next/head'
import Main from '../../components/Main/index';
import { Post } from '../../models/post';
import Header from '../../components/Header/index';
import { Article } from '../../components/Article/index';
import { get } from '../../utils/api';

type Props = {
  post?: Post | null;
}

export default function PostPage(props: Props) {
  if (props.post === undefined) {
    return (
      <div>読み込み中...</div>
    )
  }

  if (props.post === null) {
    return "404 NotFound"
  }

  return (
    <>
      <Head>
        <title>{props.post.title} - gaaamiiのブログ</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="間違ったことを書いている時があります。コメントやTwitter、ブコメなどでご指摘ください" />
      </Head>

      <Header />
      <Main>
        <Article post={props.post} />
      </Main>
    </>
  )
}

type Query = {
  id: string;
}
export async function getStaticProps(context: GetStaticPropsContext<Query>) {
  const res = await get(`/posts/${context.params.id}`)
  const post = res.ok ? await res.json() : null

  return {
    props: {
      post,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}