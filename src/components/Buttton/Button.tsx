import classes from "./Button.module.scss";

interface ButtonInterface {
  children?: React.ReactNode;
  type: "submit" | "button" | "reset";
  className?: string;
  onClick?: () => void
}
const Button: React.FC<ButtonInterface> = (props) => {
  const { children, type, className, onClick } = props;

  const onClickHandler = () => {
    onClick && onClick();
  }

  return (
    <button onClick={onClickHandler} type={type || 'button'} className={`${className} ${classes.button}`}>
      {children}
    </button>
  );
};

export default Button;
