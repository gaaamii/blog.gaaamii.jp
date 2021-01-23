import { GetStaticPropsContext } from 'next'
import Head from 'next/head'
import Header from '../components/Header/index';
import Main from '../components/Main/index';
import PageLink from '../components/PageLink/index';
import { Post } from '../models/post';
import { get } from '../utils/api';

type Props = {
  posts?: Post[];
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
  if (!props.posts) {
    return (
      <div>読み込み中...</div>
    )
  }

  return (
    <ul>
      {props.posts.map(post => (
        <PageLink href={`/posts/${post.id}`} title={post.title} key={post.id} />
      ))}
    </ul>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const res = await get(`/posts`)
  const posts = res.ok ? await res.json() : []

  return {
    props: {
      posts,
    },
    revalidate: 1,
  }
}
