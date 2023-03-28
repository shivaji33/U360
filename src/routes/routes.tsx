import { createBrowserRouter, RouteObject } from "react-router-dom";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import RootLayout from "../components/RootLayout/RootLayout";
import Login from "../modules/authentication/login/Login";
import { expensesRoutes } from "./Expenses";

const routes: RouteObject[] = [
  {
    path: '/',
    element: false ? <RootLayout /> : <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: expensesRoutes
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  }
];
export const router = createBrowserRouter(routes);


