import { ReactNode } from "react";
import { Expense } from "../ExpenseList/models/expense";
import classes from './ExpenseItem.module.scss'

const ExpenseItem: React.FC<{expense: Expense, children?: ReactNode}> = (props) => {
return (
    <div className={`${classes['expense-container']} shadow-sm bg-white p-2 mb-2`}>
    <p>Created: {props.expense.createDate.toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}</p>
    <p>Expense Type: {props.expense.expenseType}</p>
    <p>Source: {props.expense.paidFrom.sourceType}</p>
    <p>Account: {props.expense.paidFrom.account}</p>
    <p>Amount: {props.expense.amount}</p>
   </div>
);
}

export default ExpenseItem;