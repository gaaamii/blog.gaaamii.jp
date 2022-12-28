import Head from 'next/head'
import { useState } from 'react';
import Main from '../components/Main/index';
import { NavigationHeader } from '../components/NavigationHeader/index';
import { PostStatus } from '../models/post';
import { useAuthorization } from '../hooks/useAuthorization';
import { useFetchPosts } from '../hooks/useFetchPosts';
import PostLink from '../components/PostLink/index';

type Props = {}

export default function Admin(props: Props) {
  const { isAuthorized } = useAuthorization()

  return isAuthorized ? (
    <>
      <Head>
        <title>管理者ページ | gaaamiiのブログ</title>
      </Head>

      <NavigationHeader />
      <Main>
        <section>
          <h1 className='font-bold bg-slate-700 text-center rounded-sm p-2 text-white'>管理者ページ</h1>
        </section>
        <PostSection />
      </Main>
    </>
  ) : null
}

const PostSection = () => {
  const [postStatus, setPostStatus] = useState<PostStatus | null>(null);
  const handleChangeStatus = (e: any) => {
    setPostStatus(e.target.value)
  }

  return (
    <section className='mt-8'>
      <h2 className="font-bold">記事一覧</h2>
      <div className='flex gap-4 mt-4 items-center'>
        <div>公開状態</div>
        <PostSelect onChange={handleChangeStatus} />
      </div>
      <div className="mt-4">
        <PostList postStatus={postStatus} />
      </div>
    </section>
  )
}

const PostSelect = ({ onChange }: { onChange: any }) => {
  return (
    <select className="border border-slate-500 h-8 w-40 rounded" onChange={onChange}>
      <option value="all">すべて</option>
      <option value="draft">下書き</option>
      <option value="published">公開済み</option>
    </select>
  )
}

const PostList = ({ postStatus }: { postStatus: PostStatus | null }) => {
  const { isLoading, posts } = useFetchPosts(postStatus)

  if (isLoading) {
    return <p className="text-center bg-slate-200 py-2">読込中...</p>
  }

  return posts && (
    <div>
      {
        posts.map(post => (
          <PostLink {...post} editable />
        ))
      }
    </div>
  )
}
