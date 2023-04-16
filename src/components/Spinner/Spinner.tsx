import CircularProgress from "@mui/material/CircularProgress";
import classes from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={classes['center-spinner']}>
        <div className="flex h-full justify-center items-center">
        <CircularProgress color="inherit" />
        </div>
    </div>
  );
};

export default Spinner;
