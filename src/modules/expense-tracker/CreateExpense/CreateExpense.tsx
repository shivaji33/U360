import { FormEvent, useMemo, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import SelectWithNew, {
  SelectWithNewRef,
} from "../../../components/SelectWithNew/SelectWithNew";
import Select from "../../../components/Select/Select";
import TextArea from "../../../components/TextArea/TextArea";
import classes from "./CreateExpense.module.scss";

import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import db from "../../../firebase/firebase.init";

const CreateExpense = () => {
  const navigate = useNavigate();
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [bankList, setBankList] = useState([]);
  const bankListInputRef = useRef<SelectWithNewRef>(null);
  
  const formReducer = (state:ExpenseForm, action: {type: 'update', payload: {name: string, value: any}}) => {
    switch (action.type) {
      case 'update':
        return {
          ...state,
          [action.payload.name]: action.payload.value
        };
      default:
        return state;
    }
  };
  interface ExpenseForm {
    expenseDate: string;
    expenseType: string;
    expenseDetails: string;
    expenseAttachment: string;
    expenseAmount: string;
    paymentType: string;
    bankDetails: string;
    transactionId: string
  }
  const formInitValue:ExpenseForm = {
    expenseDate: '',
    expenseType: '',
    expenseDetails: '',
    expenseAttachment: '',
    expenseAmount: '',
    paymentType: '',
    bankDetails: '',
    transactionId: ''
  }
  const [state, dispatch] = useReducer(formReducer, formInitValue);

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO
    console.log(state);
  };
  const fetchExpenseTypes = async () => {
    const c = collection(db, "expenseTypes");
    const q = query(c, orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);
    setExpenseTypes(
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) || []
    );
  };
  const fetchPaymentTypes = async () => {
    const c = collection(db, "paymentTypes");
    const q = query(c, orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);
    setPaymentTypes(
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) || []
    );
  };
  const fetchBankList = async () => {
    const c = collection(db, "bankList");
    const q = query(c, orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);
    setBankList(
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) || []
    );
  };
  useMemo(() => {
    fetchExpenseTypes();
    fetchPaymentTypes();
    fetchBankList();
  }, []);

  const onAddDocs = async (value) => {
    try {
      const c = collection(db, "bankList");
      await setDoc(doc(c), {
        name: value,
        createdAt: new Date().getTime(),
      });
      bankListInputRef.current.cancelCreateItem();
      fetchBankList();
    } catch (err) {
      console.log("Error at Select with item");
    }
  };

  const onAddNewBank = (value: string) => {
    const trimmedValue = value.trim();
    onAddDocs(trimmedValue);
  };

  return (
    <div className={`m-4 ${classes["ce-wrapper"]}`}>
      <div className={`main-header ${classes["ce-header"]}`}>
        <i
          onClick={() => {
            navigate("/home/expenses");
          }}
          className="fa-solid cursor-pointer fa-arrow-left text-3xl"
        ></i>
        <span>Create Expense</span>
      </div>
      <form onSubmit={onSubmitForm} className="shadow-md bg-white p-4 mt-4">
        <Input
          type="date"
          name="expenseDate"
          value={state.expenseDate}
          onChange={(event) => dispatch({type: 'update', payload: {name: 'expenseDate', value: event.target.value}})}
          id="expenseDate"
          className="mb-4"
          label="Expense Date"
          required
        />
        <Select
          className="mb-4"
          label="Expense Type"
          name="expenseType"
          value={state.expenseType}
          onChange={(event) => dispatch({type: 'update', payload: {name: 'expenseType', value: event.target.value}})}
          optionLabel="name"
          optionValue="id"
          options={expenseTypes}
          required
        />
        <TextArea
          name="expenseDetails"
          value={state.expenseDetails}
          onChange={(event) => dispatch({type: 'update', payload: {name: 'expenseDetails', value: event.target.value}})}
          id="ExpenseDetails"
          className="mb-4"
          label="Expense Details"
          required
        />
        <Input
          type="file"
          name="expenseAttachment"
          id="expenseAttachment"
          value={state.expenseAttachment}
          onChange={(event) => dispatch({type: 'update', payload: {name: 'expenseAttachment', value: event.target.value}})}
          className="mb-4"
          accept="image/jpg,image/jpeg,image/png,application/pdf"
          multiple
          label="Upload Image/Pdf"
          required
        />
        <Input
          type="number"
          name="expenseAmount"
          value={state.expenseAmount}
          onChange={(event) => dispatch({type: 'update', payload: {name: 'expenseAmount', value: event.target.value}})}
          id="expenseAmount"
          className="mb-4"
          label="Expense Amount (Rupees)"
          required
        />
        <h1 className="text-2xl mb-4">Payment details</h1>
        <Select
          className="mb-4"
          label="Payment Type"
          name="paymentType"
          value={state.paymentType}
          onChange={(event) => dispatch({type: 'update', payload: {name: 'paymentType', value: event.target.value}})}
          optionLabel="name"
          optionValue="id"
          options={paymentTypes}
          required
        />
        <SelectWithNew
          ref={bankListInputRef}
          className="mb-4"
          required
          label="Bank"
          name="bankDetails"
          value={state.bankDetails}
          onChange={(event) => dispatch({type: 'update', payload: {name: 'bankDetails', value: event}})}
          onAddNewItem={onAddNewBank}
          options={bankList}
          optionLabel="name"
          optionValue="id"
        />
        <Input
          name="transactionId"
          id="transactionId"
          value={state.transactionId}
          onChange={(event) => dispatch({type: 'update', payload: {name: 'transactionId', value: event.target.value}})}
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
