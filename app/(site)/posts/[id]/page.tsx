import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article } from "../../../../components/Article";
import { MarkdownCompiledOnServer } from "../../../../components/Markdown/server";
import { Button } from "../../../../components/Button";
import { BackIcon } from "../../../../components/icons/Back";
import { fetchPostById, fetchStaticPostParams } from "../../../../lib/posts";
import { SITE_INFO } from "../../../../config/settings";

type Params = {
  id: string;
};

export const dynamicParams = false;
export const revalidate = 3600;

export async function generateStaticParams() {
  return fetchStaticPostParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchPostById(id);

  if (!post) {
    return {
      title: "投稿が見つかりません",
    };
  }

  const pageTitle = `${post.title} - ${SITE_INFO.title}`;
  const description = `${post.body.slice(0, 30)}...`;

  return {
    title: pageTitle,
    description,
    twitter: {
      card: "summary",
      site: "@gaaamii",
      title: pageTitle,
      description,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const post = await fetchPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <Article post={post}>
      <MarkdownCompiledOnServer source={post.body} />
      <ArticleFooter />
    </Article>
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
