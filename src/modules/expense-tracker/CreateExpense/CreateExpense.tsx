import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input/Input";
import MultiSelect from "../../../components/MultiSelect/MultiSelect";
import Select from "../../../components/Select/Select";
import TextArea from "../../../components/TextArea/TextArea";
import { ExpenseType, PaymentTypes } from "../expense.constant";
import classes from "./CreateExpense.module.scss";
const CreateExpense = () => {
  const navigate = useNavigate();
  const expenseTypes = ExpenseType?.map((et) => ({ label: et, value: et }));
  const paymentType = PaymentTypes?.map((et) => ({ label: et, value: et }));
  const onAddNewBank = (value: string) => {
    console.log(value);
  };
  return (
    <div className={`m-4 ${classes["ce-wrapper"]}`}>
      <div className={`main-header ${classes["ce-header"]}`}>
        <i
          onClick={() => {
            navigate("/expenses");
          }}
          className="fa-solid cursor-pointer fa-arrow-left text-3xl"
        ></i>
        <span>Create Expense</span>
      </div>
      <div className="shadow-md bg-white p-4 mt-4">
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
      </div>
    </div>
  );
};

export default CreateExpense;
