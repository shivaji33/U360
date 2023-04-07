import { useNavigate } from 'react-router-dom';
import classes from './Home.module.scss';

const Home = () => {
    const navigate = useNavigate();
  return (
      <ul className={classes["menu-list"]}>
        <li
          onClick={() => navigate("/expenses")}
          className={"shadow-sm " + classes["expense-card"]}
        >
          <span className={classes["content"]}>EXPENSES</span>
        </li>
        <li className={"shadow-sm " + classes["todo-card"]}>
          <span className={classes["content"]}>TODO</span>
        </li>
      </ul>
  );
};

export default Home;
