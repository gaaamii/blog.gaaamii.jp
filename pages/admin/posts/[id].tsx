import Head from 'next/head'
import Main from '../../../components/Main/index';
import { Article } from '../../../components/Article/index';
import { NavigationHeader } from '../../../components/NavigationHeader/index';
import { useFetchPostAsAdmin } from '../../../hooks/useFetchPostAsAdmin';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAuthorization } from '../../../hooks/useAuthorization';

export default function AdminPostPage() {
  const { isAuthorized, isLoading, pageTitle, post } = useAdminPost()

  if (!isLoading && !isAuthorized) {
    return 'Not Found'
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="間違ったことを書いている時があります。コメントやTwitter、ブコメなどでご指摘ください" />
      </Head>

      <NavigationHeader />
      <Main>
        { isLoading
          ? <div>読み込み中...</div>
          : <Article post={post} />
        }
      </Main>
    </>
  )
}

const useAdminPost = () => {
  const { id } = useRouter().query as { id: string; }
  const { post, isLoading } = useFetchPostAsAdmin({ postId: id })
  const [pageTitle, setPageTitle] = useState<string>("gaaamiiのブログ")
  const { isAuthorized } = useAuthorization()

  useEffect(
    () => {
      if (post) {
        setPageTitle(`(下書き) ${post.title} - gaaamiiのブログ`)
      }
    },
    [post?.id]
  )

  return {
    isAuthorized,
    isLoading,
    pageTitle,
    post
  }
}
