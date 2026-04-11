import { Link, useParams } from "react-router-dom";

export const PostDetailPage = () => {
  const { id } = useParams();

  return (
    <section>
      <h2>Post Detail</h2>
      <p>Post ID: {id}</p>
      <p>
        <Link to={`/posts/${id}/edit`}>この投稿を編集</Link>
      </p>
    </section>
  );
};
