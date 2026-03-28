import { useParams } from "react-router-dom";

export const PostEditPage = () => {
  const { id } = useParams();

  return (
    <section>
      <h2>Edit Post</h2>
      <p>`/posts/:id/edit` の PoC ページです。対象 ID: {id}</p>
    </section>
  );
};
