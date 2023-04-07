import { createBrowserRouter, RouteObject } from "react-router-dom";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import RootLayout from "../components/RootLayout/RootLayout";
import Login from "../modules/authentication/login/Login";
import { expensesRoutes } from "./Expenses";
import ProtectedRoute from "./ProtectedRoute";
import UnProtectedRoute from "./UnProtectedRoute";

const routes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedRoute><RootLayout /></ProtectedRoute>,
    errorElement: <ErrorPage />,
    children: expensesRoutes
  },
  {
    path: '/login',
    element: <UnProtectedRoute><Login /></UnProtectedRoute>,
    errorElement: <ErrorPage />,
  }
];
export const router = createBrowserRouter(routes);


