import { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import MultiSelect from "../../../components/MultiSelect/MultiSelect";
import Select from "../../../components/Select/Select";
import TextArea from "../../../components/TextArea/TextArea";
import { ExpenseType, PaymentTypes } from "../expense.constant";
import classes from "./CreateExpense.module.scss";

import { collection, doc, getDocs, orderBy, query, setDoc} from "firebase/firestore";
import db from "../../../firebase/firebase.init";

const CreateExpense = () => {
  const navigate = useNavigate();
  const paymentType = PaymentTypes?.map((et) => ({ id: et, name: et }));
  const [expenseTypes, setExpenseTypes] = useState([]);

  const onAddNewBank = (value: string) => {
    console.log(value);
  };
  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const fetchExpenseTypes = async () => {
    const c = collection(db, 'expenseTypes');
    const q = query(c,orderBy("createdAt", "asc"))
    const querySnapshot = await getDocs(q);
    setExpenseTypes(querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) || []);
  }
  useMemo(() => {
    fetchExpenseTypes();
  }, []);
  const onAddDocs = () => {
    const c = collection(db, 'expenseTypes')
    ExpenseType.forEach(async et => {
      await setDoc(doc(c), {
        name: et,
        createdAt : new Date().getTime()
      })
    }); 
  }
  return (
    <div className={`m-4 ${classes["ce-wrapper"]}`}>
      <button onClick={onAddDocs}>Add Docs</button>
      <div className={`main-header ${classes["ce-header"]}`}>
        <i
          onClick={() => {
            navigate("/expenses");
          }}
          className="fa-solid cursor-pointer fa-arrow-left text-3xl"
        ></i>
        <span>Create Expense</span>
      </div>
      <form onSubmit={onSubmitForm} className="shadow-md bg-white p-4 mt-4">
        <Input
          type="date"
          name="expenseDate"
          id="expenseDate"
          className="mb-4"
          label="Expense Date"
          required
        />
        <Select
          className="mb-4"
          label="Expense Type"
          optionLabel="name"
          optionValue="id"
          options={expenseTypes}
          required
        />
        <TextArea
          name="ExpenseDetails"
          id="ExpenseDetails"
          className="mb-4"
          label="Expense Details"
          required
        />
        <Input
          type="file"
          name="expenseAttachment"
          id="expenseAttachment"
          className="mb-4"
          accept="image/jpg,image/jpeg,image/png,application/pdf"
          multiple
          label="Upload Image/Pdf"
          required
        />
        <Input
          type="number"
          name="expenseAmount"
          id="expenseAmount"
          className="mb-4"
          label="Expense Amount (Rupees)"
          required
        />
        <h1 className="text-2xl mb-4">Payment details</h1>
        <Select
          className="mb-4"
          label="Payment Type"
          optionLabel="name"
          optionValue="id"
          options={paymentType}
          required
        />
        <MultiSelect
          className="mb-4"
          required
          label="Bank"
          onAddNewItem={onAddNewBank}
          options={[
            { id: 1, value: "Paytm" },
            { id: 2, value: "SBI" },
            { id: 3, value: "ICIC" },
          ]}
          optionLabel="value"
          optionValue="id"
        />
        <Input
          name="transactionId"
          id="transactionId"
          className="mb-4"
          label="Transaction ID"
          required
        />
        <div className="flex items-center justify-end">
          <Button className="btn-secondary">Cancel</Button>
          <Button className="btn-primary ml-4">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateExpense;
