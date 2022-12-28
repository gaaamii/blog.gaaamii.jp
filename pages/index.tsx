import { GetStaticPropsContext } from 'next'
import Head from 'next/head'
import Main from '../components/Main/index';
import PostLink from '../components/PostLink/index';
import { Post } from '../models/post';
import { get } from '../utils/api';
import { NavigationHeader } from '../components/NavigationHeader/index';
import styles from './styles.module.css';

type Props = {
  posts?: Post[];
}

export default function Home(props: Props) {
  return (
    <>
      <Head>
        <title>gaaamiiのブログ</title>
        <meta name="description" content="間違ったことを書いている時があります。コメントやTwitter、ブコメなどでご指摘ください" />
      </Head>

      <NavigationHeader />
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
    <section className={styles.pageList}>
      <ul>
        {props.posts.map(post => (
          <PostLink {...post} key={post.id} />
        ))}
      </ul>
    </section>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const res = await get(`/posts`)
  const posts = res.ok ? await res.json() : []

  return {
    props: {
      posts,
    },
    revalidate: 300,
  }
}
