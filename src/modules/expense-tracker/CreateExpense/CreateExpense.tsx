import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input/Input";
import classes from "./CreateExpense.module.scss";
const CreateExpense = () => {
  const navigate = useNavigate();

  return (
    <div className={`m-4 ${classes["ce-wrapper"]}`}>
      <div className={`main-header ${classes["ce-header"]}`}>
        <i onClick={() => {navigate('/expenses')}} className="fa-solid cursor-pointer fa-arrow-left text-3xl"></i>
        <span>Create Expense</span>
      </div>
        <div className="shadow-md bg-white">
            <Input name="name" id="test" label="Expeense" />
        </div>
    </div>
  );
};

export default CreateExpense;
