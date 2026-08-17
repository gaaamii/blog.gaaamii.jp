import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import "./styles.css";
import { DashboardPage } from "./pages/DashboardPage";
import { PostDetailPage } from "./pages/PostDetailPage";
import { PostEditPage } from "./pages/PostEditPage";
import { PostNewPage } from "./pages/PostNewPage";
import { useAuthorization } from "./useAuthorization";
import { AppShell } from "./components/AppShell";

const AppLayout = () => {
  const { isAuthorized, isLoading, error } = useAuthorization();

  if (isLoading) {
    return <p>Checking session...</p>;
  }

  if (error === "mock_api_unavailable") {
    return (
      <AppShell>
        <p>Mock API is not reachable.</p>
        <p>Start `yarn dev:editor-mock-api` and reload this page.</p>
      </AppShell>
    );
  }

  if (!isAuthorized) {
    return (
      <AppShell>
        <p>Not authorized. Please sign in from the legacy editor flow.</p>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
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
