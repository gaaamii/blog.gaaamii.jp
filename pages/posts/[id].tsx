import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { Post } from "../../models/post";
import { Article } from "../../components/Article/index";
import { get } from "../../utils/api";
import { serialize } from "next-mdx-remote/serialize";
import rehypeImageSize from "../../components/Markdown/rehype-plugins/rehype-image-size";
import { MarkdownCompiledOnServer } from "../../components/Markdown";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";
import MainLayout from "../../components/layouts/MainLayout";
import { BackIcon } from "../../components/icons/Back";

type Props = {
  post?: Post | null;
  mdxSource?: MDXRemoteSerializeResult;
};

export default function PostPage(props: Props) {
  if (props.post === undefined) {
    return <div>読み込み中...</div>;
  }

  if (props.post === null) {
    return "404 NotFound";
  }

  const pageTitle = `${props.post.title} - gaaamiiのブログ`;

  return (
    <MainLayout>
      <Head>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@gaaamii" />
        <meta name="twitter:title" content={pageTitle} />
        <meta
          name="twitter:description"
          content={`${props.post.body.slice(0, 30)}...`}
        />
      </Head>

      <Article post={props.post}>
        <MarkdownCompiledOnServer mdxSource={props.mdxSource} />
        <ArticleFooter post={props.post} />
      </Article>
    </MainLayout>
  );
}

const ArticleFooter = ({ post }: { post: Post }) => {
  return (
    <div className="mt-20">
      <BackToIndexLink postId={post.id} />
    </div>
  );
};

const BackToIndexLink = ({ postId }: { postId: number }) => (
  <Link
    href={`/#post-${postId}`}
    className="border-2 dark:border-stone-400 px-8 py-2 rounded inline-flex gap-2 items-center hover:bg-neutral-200 hover:text-black focus:bg-neutral-200 focus:text-black active:bg-neutral-200 active:text-black dark:hover:bg-neutral-800 dark:hover:text-stone-400 dark:hover:border-stone-500"
  >
    <BackIcon />
    <span>記事一覧に戻る</span>
  </Link>
);

type Query = {
  id: string;
};
export async function getStaticProps(context: GetStaticPropsContext<Query>) {
  const res = await get(`/posts/${context.params.id}`);

  if (res.status === 404) {
    return { props: { post: null } };
  }

  const post = res.ok ? await res.json() : null;
  const mdxSource = await serialize(post.body, {
    mdxOptions: { rehypePlugins: [rehypeImageSize] },
  });
  return { props: { post, mdxSource } };
}

export async function getStaticPaths() {
  const response = await get("/posts");

  if (response.ok) {
    const posts = (await response.json()) as Post[];
    const paths = posts.map((post) => `/posts/${post.id}`);

    return { paths, fallback: false };
  }

  return { paths: [], fallback: true };
}
