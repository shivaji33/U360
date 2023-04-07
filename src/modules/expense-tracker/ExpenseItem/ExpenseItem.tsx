import { ReactNode } from "react";
import { convertToDDMMYYYY } from "../../../utils/date-manupulation";
import { Expense } from "../models/expense";
import classes from "./ExpenseItem.module.scss";

const ExpenseItem: React.FC<{ expense: Expense; children?: ReactNode }> = (
  props
) => {
  return (
    <div
      className={`${classes["expense-container"]} shadow-sm bg-white p-2 mb-2`}
    >
      <div className={classes['expense-header']}>
        <h1>U360</h1>
        <h4>{props.expense.id}</h4>
      </div>
      <table className="table-fixed w-full">
        <tbody>
          <tr>
            <td>Expense Date</td>
            <td>{convertToDDMMYYYY(props.expense.expenseDate)}</td>
          </tr>
          <tr>
            <td>Expense Type</td>
            <td>{props.expense.expenseType.name}</td>
          </tr>
          <tr>
            <td>Expense Details</td>
            <td>{props.expense.expenseDetails}</td>
          </tr>
          <tr>
            <td>Amount</td>
            <td>{props.expense.expenseAmount}</td>
          </tr>
          <tr>
            <td>Payment Type</td>
            <td>{props.expense.paymentType.name}</td>
          </tr>
          <tr>
            <td>Bank details</td>
            <td>{props.expense.bankDetails.name}</td>
          </tr>
          <tr>
            <td>Transaction Id</td>
            <td>{props.expense.transactionId}</td>
          </tr>
        </tbody>
      </table>
      {/* <p>Expense Date: {convertToDDMMYYYY(props.expense.expenseDate)}</p>
      <p>Expense Type: {props.expense.expenseType.name}</p>
      <p>Expense Details: {props.expense.expenseDetails}</p>
      <p>Amount: {props.expense.expenseAmount}</p>
      <p>Payment Type: {props.expense.paymentType.name}</p>
      <p>Bank details: {props.expense.bankDetails.name}</p>
      <p>Transaction Id: {props.expense.transactionId}</p> */}
    </div>
  );
};

export default ExpenseItem;
