import Posts from "../pages/Posts";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const privateRoutes = [{ path: "/posts", element: Posts }];

export const publicRoutes = [
    { path: "/auth/login", element: Login },
    { path: "/auth/register", element: Register },
];
