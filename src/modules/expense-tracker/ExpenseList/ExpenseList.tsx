import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import ExpenseItem from "../ExpenseItem/ExpenseItem";
import classes from "./ExpenseList.module.scss";
import { Expense } from "../models/expense";
import { useEffect, useState } from "react";
import { fetchData } from "../../../api/api";
import db from "../../../firebase/firebase.init";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
    const navigate = useNavigate();
  const onCreateExpense = () => {
    navigate('create-expense');
  };
  const fetchExpenses = async () => {
   const data = await fetchData<Expense[]>(db, 'expenseList');
   setExpenses(data);
  }
  useEffect(() => {
    fetchExpenses();
  },[]);
  return (
    <div className={classes["expense-list"]}>
      <div className="flex items-center justify-between">
        <h1 className="text-app-pink main-header mb-4">Expense List</h1>
        <Button type="button" onClick={onCreateExpense} className="mb-4 btn-primary">
          Create
        </Button>
      </div>
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </div>
  );
};

export default ExpenseList;
