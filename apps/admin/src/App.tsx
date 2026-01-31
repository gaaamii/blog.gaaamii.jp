import { Link, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui", padding: "24px" }}>
      <h1>Admin Console</h1>
      <nav>
        <Link to="/">Dashboard</Link> | <Link to="/settings">Settings</Link>
      </nav>
      <Routes>
        <Route path="/" element={<p>管理画面のダッシュボード。</p>} />
        <Route path="/settings" element={<p>設定ページ。</p>} />
      </Routes>
    </div>
  );
}
