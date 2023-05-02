import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
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
import {
  BANK_LIST,
  EXPENSE_LIST,
  EXPENSE_TYPES,
  PAYMENT_TYPES,
} from "../../../db/db.constant";
import { WALLET } from "../expense.constant";
import { where } from "firebase/firestore";
import Spinner from "../../../components/Spinner/Spinner";
import { convertToYYYYMMDD } from "../../../utils/date-manupulation";
import Toster from "../../../components/Toster/Toster";

const CreateExpense = () => {
  const navigate = useNavigate();
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const bankListInputRef = useRef<SelectWithNewRef>(null);
  const authData = getUserAuthData();
  const [isOpenToster, setIsOpenToster] = useState(false);
  const [tosterMessage, setTosterMessage] = useState('');
  const [masterDataLoader, setMasterDataLoader] = useState(false);

  const paymentDataInit = {
    paymentType: null,
    paymentAmount: '',
    bankDetails: null,
    transactionId: "",
  };

  const formReducer = (
    state: ExpenseForm,
    action: {
      type: "update" | "addPaymentData" | 'removePaymentData';
      payload: { name: string; value: any } | null;
    }
  ) => {
    switch (action.type) {
      case "update":
        const [parent, childIndex, child] = action.payload.name.split(".");
        if (childIndex && child) {
          return {
            ...state,
            [parent]: state.paymentDetails.map((pd, i) => {
              if (i === +childIndex) {
                return { ...pd, [child]: action.payload.value };
              }
              return pd;
            }),
          };
        }
        return {
          ...state,
          [parent]: action.payload.value,
        };
      case "addPaymentData": {
        return {
          ...state,
          paymentDetails: [...state.paymentDetails, paymentDataInit],
        };
      }
      case 'removePaymentData': {
        return {
          ...state,
          paymentDetails: state.paymentDetails.filter((pd, i) => i !== action.payload.value),
        };
      }
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
    paymentDetails: {
      paymentType: string;
      bankDetails?: null;
      paymentAmount: number | string
      transactionId?: string;
    }[];
  }
  const formInitValue: ExpenseForm = {
    expenseDate: "",
    expenseType: null,
    expenseDetails: "",
    expenseAttachment: null,
    expenseAmount: "",
    paymentDetails: [paymentDataInit],
  };
  const [state, dispatch] = useReducer(formReducer, formInitValue);
  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (+state.expenseAmount !== state.paymentDetails.reduce((acc, {paymentAmount}) => +acc + +paymentAmount, 0)) {
      setIsLoading(false);
      alert("Total expense amount shoud match with payment amount");
      return;
    }
    
    let attachments = [];
    if (state.expenseAttachment) {
      for (let attachment of state.expenseAttachment) {
        const data = await uploadFileTOFirebaseStorage(
          attachment,
          authData?.uid
        );
        attachments.push(data);
      }
    }
    if (!attachments.length) {
      setIsLoading(false);
      alert("Please upload attchments");
      return;
    }
    try {
      const body = {
        createdBy: authData?.uid,
        expenseDate: state.expenseDate,
        expenseType: JSON.parse(state.expenseType),
        expenseDetails: state.expenseDetails,
        expenseAttachment: attachments,
        expenseAmount: state.expenseAmount,
        paymentDetails: state.paymentDetails.map((pd) => ({
          ...pd,
          paymentType: JSON.parse(pd.paymentType),
        })),
      };
      await postData(db, EXPENSE_LIST, body);
      setTosterMessage('Expense added succesfully!');
      setIsOpenToster(true);
      setIsLoading(false);
      setTimeout(() => navigate("/expenses"),1000);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchExpenseTypes = async () => {
    setMasterDataLoader(true);
    const res = await fetchData<MasterData[]>(db, EXPENSE_TYPES);
    setMasterDataLoader(false);
    setExpenseTypes(res);
  };
  const fetchPaymentTypes = async () => {
    setMasterDataLoader(true);
    const res = await fetchData<MasterData[]>(db, PAYMENT_TYPES);
    setMasterDataLoader(false);
    setPaymentTypes(res);
  };
  const fetchBankList = async () => {
    setMasterDataLoader(true);
    const res1 = await fetchData<MasterData[]>(
      db,
      BANK_LIST,
      where("createdBy", "==", null)
    );
    const res2 = await fetchData<MasterData[]>(
      db,
      BANK_LIST,
      where("createdBy", "==", authData?.uid)
    );
    setMasterDataLoader(false);
    setBankList([...res2, ...res1]);
  };
  useEffect(() => {
    fetchExpenseTypes();
    fetchPaymentTypes();
    fetchBankList();
  }, []);

  const onAddNewBank = async (value: string) => {
    const trimmedValue = value.trim();
    try {
      await postData(db, BANK_LIST, {
        name: trimmedValue,
        createdAt: new Date().getTime(),
        createdBy: authData?.uid,
      });
      bankListInputRef.current.cancelCreateItem();
      fetchBankList();
    } catch (err) {
      console.log("Error at Select with item");
    }
  };

  const onUploadExpenseFiles = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update",
      payload: { name: "expenseAttachment", value: event.target.files },
    });
  };

  const onAddMorePaymentDetails = () => {
    dispatch({ type: "addPaymentData", payload: null });
  };
  const onRemovePaymentDetails = (index: number) => {
    dispatch({ type: "removePaymentData", payload: {name: '', value: index} });
  }
  return (
    <>
      {<Toster isOpen={isOpenToster} message={tosterMessage} setIsOpen={setIsOpenToster} />}
      {(isLoading || masterDataLoader)&& <Spinner />}
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
            max={convertToYYYYMMDD()}
            onChange={(event) =>
              dispatch({
                type: "update",
                payload: { name: "expenseDate", value: event.target.value },
              })
            }
            id="expenseDate"
            className="mb-4"
            label="Expense Date"
            required
          />
          <Select
            className="mb-4"
            label="Expense Type"
            name="expenseType"
            onChange={(event) =>
              dispatch({
                type: "update",
                payload: { name: "expenseType", value: event.target.value },
              })
            }
            optionLabel="name"
            optionValue="id"
            options={expenseTypes}
            required
          />
          <TextArea
            name="expenseDetails"
            onChange={(event) =>
              dispatch({
                type: "update",
                payload: { name: "expenseDetails", value: event.target.value },
              })
            }
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
            onChange={(event) =>
              dispatch({
                type: "update",
                payload: { name: "expenseAmount", value: event.target.value },
              })
            }
            id="expenseAmount"
            className="mb-4"
            label="Expense Amount (Rupees)"
            required
          />
          {state.paymentDetails.map((paymentEle, i) => (
            <div key={i}>
              <div className="flex justify-between items-center">
                <h1 className="text-2xl mb-4">Payment Details - {i + 1}</h1>
                <div>
                {i + 1 === state.paymentDetails.length && <i
                  className="fas fa-plus-square color-pink text-2xl"
                  onClick={onAddMorePaymentDetails}
                ></i>}
                 {i > 0 && <i
                  className="fas fa-minus-square color-pink ml-3 text-2xl"
                  onClick={onRemovePaymentDetails.bind(this, i)}
                ></i>}
                </div>
              </div>
              <Select
                className="mb-4"
                label="Payment Type"
                name="paymentType"
                onChange={(event) =>
                  dispatch({
                    type: "update",
                    payload: {
                      name: `paymentDetails.${i}.paymentType`,
                      value: event.target.value,
                    },
                  })
                }
                optionLabel="name"
                optionValue="id"
                options={paymentTypes}
                required
              />
              <Input
            type="number"
            name="paymentAmount"
            onChange={(event) =>
              dispatch({
                type: "update",
                payload: { name: `paymentDetails.${i}.paymentAmount`, value: event.target.value },
              })
            }
            id="paymentAmount"
            className="mb-4"
            label="Amount (Rupees)"
            required
          />
              {paymentEle.paymentType &&
                JSON.parse(paymentEle.paymentType)?.name !== WALLET && (
                  <SelectWithNew
                    ref={bankListInputRef}
                    className="mb-4"
                    required
                    label="Bank"
                    name="bankDetails"
                    onChange={(event) =>
                      dispatch({
                        type: "update",
                        payload: {
                          name: `paymentDetails.${i}.bankDetails`,
                          value: event,
                        },
                      })
                    }
                    onAddNewItem={onAddNewBank}
                    options={bankList}
                    optionLabel="name"
                    optionValue="id"
                  />
                )}
              {paymentEle.paymentType &&
                JSON.parse(paymentEle.paymentType)?.name !== WALLET && (
                  <Input
                    name="transactionId"
                    id="transactionId"
                    onChange={(event) =>
                      dispatch({
                        type: "update",
                        payload: {
                          name: `paymentDetails.${i}.transactionId`,
                          value: event.target.value,
                        },
                      })
                    }
                    className="mb-4"
                    label="Transaction ID"
                    required
                  />
                )}
            </div>
          ))}
          <div className="flex items-center justify-end">
            <Button className="btn-secondary">Cancel</Button>
            <Button className="btn-primary ml-4">Save</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateExpense;
