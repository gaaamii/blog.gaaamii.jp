import { GetStaticPropsContext } from 'next'
import Head from 'next/head'
import Main from '../../components/Main/index';
import { Post } from '../../models/post';
import { API_URL } from '../../utils/settings';
import Header from '../../components/Header/index';
import { Article } from '../../components/Article/index';

type Props = {
  post?: Post;
}

export default function PostPage(props: Props) {
  if (!props.post) {
    return (
      <div>読み込み中...</div>
    )
  }
  return (
    <>
      <Head>
        <title>{props.post.name} - gaaamiiのブログ</title>
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
  const res = await fetch(`${API_URL}/contents/${context.params.id}`)

  let post = undefined

  if (res.ok) {
    const json = await res.json()
    post = json
  }
  console.log('post', post)

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