import HomeClient from "./home-client";
import { fetchPosts } from "../../lib/posts";

export const revalidate = 3600;

export default async function HomePage() {
  const posts = await fetchPosts();
  return <HomeClient posts={posts} />;
}
