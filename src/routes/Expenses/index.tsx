import { RouteObject } from "react-router-dom";
import ExpenseTracker from "../../modules/expense-tracker";
import CreateExpense from "../../modules/expense-tracker/CreateExpense/CreateExpense";
import ExpenseList from "../../modules/expense-tracker/ExpenseList/ExpenseList";

export const expensesRoutes: RouteObject[] = [
    {
      path: 'expenses',
      element: <ExpenseTracker />,
      children: [{
        path: '',
        element: <ExpenseList />
      },{
        path: 'create-expense',
        element: <CreateExpense />
      }]
    },
  ];