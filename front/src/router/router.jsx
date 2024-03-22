import Posts from "../pages/Posts";
import Login from "../pages/Login";

export const privateRoutes = [
    { path: "/posts", component: Posts, exact: true },
];

export const publicRoutes = [{ path: "/login", component: Login, exact: true }];
