import { GetStaticPropsContext } from "next";
import { PostLink } from "../components/PostLink/index";
import { Post } from "../models/post";
import { get } from "../utils/api";
import MainLayout from "../components/layouts/MainLayout";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { getLocalizedDateString } from "../utils/datetime";

type Props = {
  posts?: Post[];
};

export default function Home(props: Props) {
  const { query, onChangeQuery, onEnterQuery } = useHome();

  return (
    <MainLayout>
      <Search query={query} onChange={onChangeQuery} onEnter={onEnterQuery} />
      <Posts posts={props.posts} query={query} />
    </MainLayout>
  );
}

const useHome = () => {
  const searchParamsQuery = useSearchParams().get("query");
  const [query, setQuery] = useState<string>(searchParamsQuery);

  useEffect(() => {
    setQuery(searchParamsQuery);
  }, [searchParamsQuery]);

  const onChangeQuery = (text: string) => {
    setQuery(text);
  };

  const router = useRouter();
  const onEnterQuery = (e) => {
    e.preventDefault();
    const nextQuery = query ? { query } : {};
    router.push(nextQuery);
    e.target.childNodes[0].blur();
  };

  return {
    query,
    onChangeQuery,
    onEnterQuery,
  };
};

const getSearchPlaceholder = () => {
  const samples = ["Elm", "Next.js", "AtCoder", "Rails", "CSS"];
  const currentMinute = new Date().getMinutes();

  return samples[currentMinute % samples.length];
};

type SearchProps = {
  onChange: (text: string) => void;
  onEnter: (e: any) => void;
  query: string;
};
const Search = ({ onChange, onEnter, query }: SearchProps) => {
  const placeholder = useMemo(getSearchPlaceholder, []);

  return (
    <form
      role="search"
      onSubmit={onEnter}
      className="w-full mt-4 px-2 sm:mt-0 sm:px-0"
    >
      <label htmlFor="search-input" className="text-sm">
        記事を検索する
      </label>
      <input
        id="search-input"
        type="search"
        placeholder={placeholder}
        aria-label="記事を検索"
        className="mt-2 bg-white dark:focus:bg-neutral-800 dark:bg-neutral-800 dark:text-white dark:placeholder:text-stone-400 px-4 py-2 rounded w-full border-2 dark:border-stone-400 focus:border-transparent"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          onChange(e.target.value);
        }}
        enterKeyHint="search"
        defaultValue={query}
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
            <PostItem post={post} key={post.id} />
          ))}
      </ul>
    </section>
  );
};

const PostItem = ({ post }: { post: Post }) => {
  return (
    <div className="mt-0 sm:mt-4 relative list-none lg:flex items-center gap-1">
      <time className="inline-block text-sm">
        {getLocalizedDateString(post.published_at)}
      </time>
      <PostLink post={post} href={`/posts/${post.id}`} />
    </div>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const res = await get(`/posts`);
  const posts = res.ok ? await res.json() : [];

  return {
    props: { posts },
  };
}
