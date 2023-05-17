import { RouteObject } from "react-router-dom";
import Home from "../../components/Home/Home";
import CodeEditorHome from "../../modules/code-editor/CodeEditorHome/CodeEditorHome";
import ExpenseTracker from "../../modules/expense-tracker";
import CreateExpense from "../../modules/expense-tracker/CreateExpense/CreateExpense";
import ExpenseList from "../../modules/expense-tracker/ExpenseList/ExpenseList";

export const childRouterRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    index: true
  },
  {
    path: "expenses",
    element: <ExpenseTracker />,
    children: [
      {
        path: "",
        element: <ExpenseList />,
      },
      {
        path: "create-expense",
        element: <CreateExpense />,
      },
    ],
  },{
    path: 'code-editor',
    element: <CodeEditorHome />
  }
];
