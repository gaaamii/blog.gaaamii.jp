import { Link } from "react-router-dom";

export const DashboardPage = () => {
  return (
    <section>
      <p>管理画面トップ（`/`）の PoC ページです。</p>
      <ul>
        <li>
          <Link to="/posts/new">新規投稿</Link>
        </li>
        <li>
          <Link to="/posts/welcome">投稿詳細サンプル</Link>
        </li>
      </ul>
    </section>
  );
};
