import { GetStaticPropsContext } from "next";
import PostLink from "../components/PostLink/index";
import { Post } from "../models/post";
import { get } from "../utils/api";
import MainLayout from "../components/layouts/MainLayout";

type Props = {
  posts?: Post[];
};

export default function Home(props: Props) {
  return (
    <MainLayout>
      <Posts {...props} />
    </MainLayout>
  );
}

const Posts = (props: Props) => {
  if (!props.posts) {
    return <div>読み込み中...</div>;
  }

  return (
    <section className="py-4 sm:p-0">
      <ul>
        {props.posts.map((post) => (
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
