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
import { LinkButton } from "../../components/LinkButton";
import { Button } from "../../components/Button";

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
        <ArticleFooter />
      </Article>
    </MainLayout>
  );
}

const ArticleFooter = () => {
  return (
    <div className="mt-20">
      <BackToIndexLink />
    </div>
  );
};

const BackToIndexLink = () => (
  <Button as="Link" href={`/`} theme="outline" size="md">
    <span className="flex items-center gap-2">
      <BackIcon />
      <span>一覧に戻る</span>
    </span>
  </Button>
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
