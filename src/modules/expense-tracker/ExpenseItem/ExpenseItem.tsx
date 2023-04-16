import { ReactNode } from "react";
import FilePreviewList from "../../../components/FilePreviewList/FilePreviewList";
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
            <td>Expense Date:</td>
            <td>{convertToDDMMYYYY(props.expense.expenseDate)}</td>
          </tr>
          <tr>
            <td>Expense Type:</td>
            <td>{props.expense.expenseType.name}</td>
          </tr>
          <tr>
            <td>Expense Details:</td>
            <td>{props.expense.expenseDetails}</td>
          </tr>
          <tr>
            <td>Amount:</td>
            <td>{props.expense.expenseAmount}</td>
          </tr>
          {props.expense.paymentDetails.map(pd => <>
            <tr>
            <td>Payment Type:</td>
            <td>{pd.paymentType.name}</td>
          </tr>
          <tr>
            <td>Bank details:</td>
            <td>{pd.bankDetails?.name || '-'}</td>
          </tr>
          <tr>
            <td>Transaction Id:</td>
            <td>{pd.transactionId || '-'}</td>
          </tr></>)}
        </tbody>
      </table>
      <FilePreviewList expense={props.expense} />
    </div>
  );
};

export default ExpenseItem;
