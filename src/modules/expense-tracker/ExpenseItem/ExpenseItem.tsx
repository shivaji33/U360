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
      <div className={classes["expense-header"]}>
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
        </tbody>
      </table>
    {props.expense.paymentDetails.map((pd, i) => <div key={i} className={classes['dashed-line']}>
      <div className="text-center">COUNT #{i+1}</div>
      <div className="flex mt-2">
        <span className={classes['min-width-150-px']}>Payment Type:</span>
        <span className="px-2">{pd.paymentType.name}</span>
      </div>
      <div className="flex mt-2">
      <span className={classes['min-width-150-px']}>Payment Amount:</span>
        <span className="px-2">{pd.paymentAmount}</span>
      </div>
     {pd.bankDetails?.name && <div className="flex mt-2">
      <span className={classes['min-width-150-px']}>Bank Details:</span>
        <span className="px-2">{pd.bankDetails?.name || '-'}</span>
      </div>}
     {pd.transactionId && <div className="flex mt-2">
      <span className={classes['min-width-150-px']}>Transaction ID:</span>
        <span className="px-2">{pd.transactionId || '-'}</span>
      </div>}
    </div>)}
      <FilePreviewList expense={props.expense} />
    </div>
  );
};

export default ExpenseItem;
