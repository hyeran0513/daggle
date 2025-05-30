import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import PostDetail from "../pages/PostDetail";
import NotFound from "../pages/NotFound";
import PostWrite from "../pages/PostWrite";
import Login from "../pages/Login";
import PostEdit from "../pages/PostEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "post/:id", element: <PostDetail /> },
      { path: "post/write", element: <PostWrite /> },
      { path: "post/edit/:id", element: <PostEdit /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
