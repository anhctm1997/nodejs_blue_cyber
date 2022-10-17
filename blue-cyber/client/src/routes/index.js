import NotFound from "../pages/404";
import Verify2fa from "../pages/Verify";
import Login from "../pages/Login";

export const publicRoutes = [
  { path: "/login", component: Login, layout: null },
  { path: "/error", component: NotFound, layout: null },
  { path: "/verify", component: Verify2fa, layout: null },
];

export const privateRoutes = [];
