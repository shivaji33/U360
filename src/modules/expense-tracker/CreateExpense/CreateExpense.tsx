import { ChangeEvent, FormEvent, useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import SelectWithNew, {
  SelectWithNewRef,
} from "../../../components/SelectWithNew/SelectWithNew";
import Select from "../../../components/Select/Select";
import TextArea from "../../../components/TextArea/TextArea";
import classes from "./CreateExpense.module.scss";
import db from "../../../firebase/firebase.init";
import { uploadFileTOFirebaseStorage } from "../../../firebase/storage";
import { getUserAuthData } from "../../../localStorage/authData";
import { fetchData, MasterData, postData } from "../../../api/api";

const CreateExpense = () => {
  const navigate = useNavigate();
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [bankList, setBankList] = useState([]);
  const bankListInputRef = useRef<SelectWithNewRef>(null);
  const authData = getUserAuthData();
  
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
    expenseAttachment: File[];
    expenseAmount: string;
    paymentType: string;
    bankDetails: string;
    transactionId: string
  }
  const formInitValue:ExpenseForm = {
    expenseDate: '',
    expenseType: null,
    expenseDetails: '',
    expenseAttachment: null,
    expenseAmount: '',
    paymentType: null,
    bankDetails: null,
    transactionId: ''
  }
  const [state, dispatch] = useReducer(formReducer, formInitValue);

  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let attachments = [];
    if (state.expenseAttachment) {
      for (let attachment of state.expenseAttachment) {
        const data = await uploadFileTOFirebaseStorage(attachment, authData?.uid);
        attachments.push(data);
      }
    }
    if (!attachments.length) {
      alert('Please upload attchments');
    }
    try {
      await postData(db,'expenseList',{
        uid: authData?.uid,
        expenseDate: state.expenseDate,
        expenseType: JSON.parse(state.expenseType),
        expenseDetails: state.expenseDetails,
        expenseAttachment: attachments,
        expenseAmount: state.expenseAmount,
        paymentType: JSON.parse(state.paymentType),
        bankDetails: state.bankDetails,
        transactionId: state.transactionId
      });
      navigate('/expenses');
    } catch (err) {

    }
  };
  const fetchExpenseTypes = async () => {
    const res = await fetchData<MasterData[]>(db,'expenseTypes');
    setExpenseTypes(res);
  };
  const fetchPaymentTypes = async () => {
    const res = await fetchData<MasterData[]>(db,'paymentTypes');
    setPaymentTypes(res);
  };
  const fetchBankList = async () => {
    const res = await fetchData<MasterData[]>(db,'bankList');
    setBankList(res)
  };
  useEffect(() => {
    fetchExpenseTypes();
    fetchPaymentTypes();
    fetchBankList();
  }, []);


  const onAddNewBank = async (value: string) => {
    const trimmedValue = value.trim();
    try {
      
      await postData(db,'bankList', {
        name: trimmedValue,
        createdAt: new Date().getTime(),
      });
      bankListInputRef.current.cancelCreateItem();
      fetchBankList();
    } catch (err) {
      console.log("Error at Select with item");
    }
  };

  const onUploadExpenseFiles = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({type: 'update', payload: {name: 'expenseAttachment', value: event.target.files}})
  }

  return (
    <div className={`${classes["ce-wrapper"]}`}>
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
          onChange={(event) => dispatch({type: 'update', payload: {name: 'expenseType', value: event.target.value}})}
          optionLabel="name"
          optionValue="id"
          options={expenseTypes}
          required
        />
        <TextArea
          name="expenseDetails"
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
          onChange={onUploadExpenseFiles}
          className="mb-4"
          accept="image/jpg,image/jpeg,image/png,application/pdf"
          multiple
          label="Upload Image/Pdf"
          required
        />
        <Input
          type="number"
          name="expenseAmount"
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
          onChange={(event) => dispatch({type: 'update', payload: {name: 'bankDetails', value: event}})}
          onAddNewItem={onAddNewBank}
          options={bankList}
          optionLabel="name"
          optionValue="id"
        />
        <Input
          name="transactionId"
          id="transactionId"
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
