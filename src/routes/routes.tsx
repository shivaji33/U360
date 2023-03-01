import { createBrowserRouter, RouteObject } from "react-router-dom";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import RootLayout from "../components/RootLayout/RootLayout";
import { expensesRoutes } from "./Expenses";

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: expensesRoutes
  },
];
export const router = createBrowserRouter(routes);


