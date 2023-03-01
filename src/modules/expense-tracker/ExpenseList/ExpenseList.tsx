import { useNavigate } from "react-router-dom";
import Button from "../../../components/Buttton/Button";
import ExpenseItem from "../ExpenseItem/ExpenseItem";
import classes from "./ExpenseList.module.scss";
import { Expense } from "./models/expense";

const DUMMY_DATA: Expense[] = [
  {
    id: 1,
    createDate: new Date(),
    amount: 2500,
    expenseType: "Grocery",
    paidFrom: {
      sourceType: "Phonepe",
      account: "PAYTM",
    },
  },
  {
    id: 2,
    createDate: new Date(),
    amount: 500,
    expenseType: "Snacks",
    paidFrom: {
      sourceType: "Cred",
      account: "ICICI",
    },
  },
];
const ExpenseList = () => {
    const navigate = useNavigate();
  const onCreateExpense = () => {
    navigate('create-expense');
  };
  return (
    <div className={classes["expense-list"]}>
      <div className="flex items-center justify-between">
        <h1 className="text-app-pink main-header mb-4">Expense List</h1>
        <Button type="button" onClick={onCreateExpense} className="mb-4">
          Create
        </Button>
      </div>
      {DUMMY_DATA.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </div>
  );
};

export default ExpenseList;
