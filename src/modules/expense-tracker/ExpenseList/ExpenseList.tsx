import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import ExpenseItem from "../ExpenseItem/ExpenseItem";
import classes from "./ExpenseList.module.scss";
import { Expense } from "../models/expense";
import { useEffect, useState } from "react";
import { fetchData } from "../../../api/api";
import db from "../../../firebase/firebase.init";
import { where } from "firebase/firestore";
import { getUserAuthData } from "../../../localStorage/authData";
import { EXPENSE_LIST } from "../../../db/db.constant";
import ExpenseListLoadingShimmer from "../../../components/LoadingShimmers/ExpenseListLoadingShimmer/ExpenseListLoadingShimmer";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const authData = getUserAuthData();
  const onCreateExpense = () => {
    navigate('create-expense');
  };
  const fetchExpenses = async () => {
    setIsLoading(true);
   const data = await fetchData<Expense[]>(db, EXPENSE_LIST,where('createdBy', '==', authData?.uid));
   setIsLoading(false);
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
     {isLoading && Array.from({length: 2}, (_, k) => <ExpenseListLoadingShimmer key={k} />)}
      {!isLoading && expenses.length > 0 && expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
      {!isLoading && expenses.length === 0 && <p className="text-center">No Expenses</p>}
    </div>
  );
};

export default ExpenseList;
