import { ButtonHTMLAttributes } from "react";
import classes from "./Button.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
}
const Button: React.FC<Props> = ({className, children, ...rest}) => {

  return (
    <button {...rest}  className={`${className} ${classes.button}`}>
      {children}
    </button>
  );
};

export default Button;
