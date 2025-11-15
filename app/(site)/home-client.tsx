"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Post } from "../../models/post";
import { PostLink } from "../../components/PostLink";
import { getLocalizedDateString } from "../../utils/datetime";

type Props = {
  posts?: Post[];
};

export default function HomeClient({ posts }: Props) {
  const { query, onChangeQuery, onEnterQuery } = useHome();

  return (
    <>
      <Search query={query} onChange={onChangeQuery} onEnter={onEnterQuery} />
      <Posts posts={posts} query={query} />
    </>
  );
}

const useHome = () => {
  const searchParams = useSearchParams();
  const searchParamsQuery = searchParams.get("query") ?? "";
  const [query, setQuery] = useState(searchParamsQuery);

  useEffect(() => {
    setQuery(searchParamsQuery);
  }, [searchParamsQuery]);

  const router = useRouter();
  const onEnterQuery = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchSuffix = query ? `?query=${encodeURIComponent(query)}` : "";
    router.push(`/${searchSuffix}`);
    const form = e.target as HTMLFormElement;
    const firstElement = form.querySelector("input");
    firstElement?.blur();
  };

  return {
    query,
    onChangeQuery: setQuery,
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
  onEnter: (e: FormEvent<HTMLFormElement>) => void;
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
        value={query}
      />
    </form>
  );
};

const matchQuery = (post: Post, query: string) =>
  post.title.toLowerCase().includes(query.toLowerCase());

type PostsProps = {
  posts?: Post[];
  query?: string;
};
const Posts = ({ posts, query }: PostsProps) => {
  if (!posts) {
    return <div>読み込み中...</div>;
  }

  return (
    <section className="py-4 xs:p-0 xs:mt-4">
      {posts
        .filter((post) => (query ? matchQuery(post, query) : post))
        .map((post) => (
          <PostItem post={post} key={post.id} />
        ))}
    </section>
  );
};

const PostItem = ({ post }: { post: Post }) => {
  return (
    <div className="mt-4 relative lg:flex lg:items-center lg:gap-2">
      <time className="block ml-4 lg:ml-0 sm:min-w-32 sm:inline-block">
        {getLocalizedDateString(post.published_at)}
      </time>
      <div className="grow">
        <PostLink post={post} href={`/posts/${post.id}`} />
      </div>
    </div>
  );
};
