import { GetStaticPropsContext } from "next";
import PostLink from "../components/PostLink/index";
import { Post } from "../models/post";
import { get } from "../utils/api";
import MainLayout from "../components/layouts/MainLayout";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

type Props = {
  posts?: Post[];
};

export default function Home(props: Props) {
  const { query, onChangeQuery, onEnterQuery } = useHome();

  return (
    <MainLayout>
      <Search onChange={onChangeQuery} onEnter={onEnterQuery} />
      <Posts posts={props.posts} query={query} />
    </MainLayout>
  );
}

const useHome = () => {
  const searchParamsQuery = useSearchParams().get("query");
  const [query, setQuery] = useState<string | undefined>(undefined);

  useEffect(() => {
    setQuery(searchParamsQuery);
  }, [searchParamsQuery]);

  const onChangeQuery = (text: string) => {
    setQuery(text);
  };

  const router = useRouter();
  const onEnterQuery = (e) => {
    e.preventDefault();
    router.push({ query: { query } });
    e.target.childNodes[0].blur();
  };

  return {
    query,
    onChangeQuery,
    onEnterQuery,
  };
};

const Search = ({
  onChange,
  onEnter,
}: {
  onChange: (text: string) => void;
  onEnter: (e: any) => void;
}) => {
  return (
    <form
      role="search"
      onSubmit={onEnter}
      className="flex justify-end w-full mt-4 px-2 sm:mt-0 sm:px-0"
    >
      <input
        type="search"
        placeholder="記事を検索"
        aria-label="記事を検索"
        className="bg-white dark:focus:bg-stone-700 dark:bg-stone-800 dark:text-white dark:placeholder:text-slate-300 px-4 py-2 rounded w-full border-2 dark:border-slate-500 focus:border-transparent"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          onChange(e.target.value);
        }}
        enterKeyHint="search"
      />
    </form>
  );
};

const matchQuery = (post: Post, query: string) =>
  post.title.toLowerCase().indexOf(query.toLocaleLowerCase()) >= 0;

type PostsProps = {
  posts: Props["posts"];
  query?: string;
};
const Posts = ({ posts, query }: PostsProps) => {
  if (!posts) {
    return <div>読み込み中...</div>;
  }

  return (
    <section className="py-4 xs:p-0 xs:mt-4">
      <ul>
        {posts
          .filter((post) => (query ? matchQuery(post, query) : post))
          .map((post) => (
            <PostLink {...post} key={post.id} />
          ))}
      </ul>
    </section>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const res = await get(`/posts`);
  const posts = res.ok ? await res.json() : [];

  return {
    props: { posts },
  };
}
