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
  const { postStatus, onChangeStatus } = usePostSelect()

  return (
    <section className='mt-8'>
      <h2 className="font-bold">記事一覧</h2>
      <div className='flex gap-4 mt-4 items-center'>
        <div>公開状態</div>
        <PostSelect value={postStatus} onChange={onChangeStatus} />
      </div>
      <div className="mt-4">
        <PostList postStatus={postStatus} />
      </div>
    </section>
  )
}

const usePostSelect = () => {
  const [postStatus, setPostStatus] = useState<PostStatus | null>("draft");
  const onChangeStatus = (e: any) => {
    if (e.target.value === "published" || e.target.value === "draft") {
      setPostStatus(e.target.value)
    } else {
      setPostStatus(null)
    }
  }

  return {
    postStatus,
    onChangeStatus
  }
}
const PostSelect = ({ onChange, value }: { onChange: any, value: PostStatus | null }) => {
  return (
    <select className="border border-slate-500 h-8 w-40 rounded" onChange={onChange}>
      <option selected={value === null} value="all">すべて</option>
      <option selected={value === "draft"} value="draft">下書き</option>
      <option selected={value === "published"} value="published">公開済み</option>
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
