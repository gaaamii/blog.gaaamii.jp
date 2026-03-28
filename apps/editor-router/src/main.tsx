import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { PostDetailPage } from "./pages/PostDetailPage";
import { PostEditPage } from "./pages/PostEditPage";
import { PostNewPage } from "./pages/PostNewPage";
import { useAuthorization } from "./useAuthorization";

const AppLayout = () => {
  const { isAuthorized, isLoading } = useAuthorization();

  if (isLoading) {
    return <p>Checking session...</p>;
  }

  if (!isAuthorized) {
    return <p>Not authorized. Please sign in from the legacy editor flow.</p>;
  }

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1>React Router Editor PoC</h1>
      <Outlet />
    </main>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "posts/new", element: <PostNewPage /> },
      { path: "posts/:id", element: <PostDetailPage /> },
      { path: "posts/:id/edit", element: <PostEditPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
