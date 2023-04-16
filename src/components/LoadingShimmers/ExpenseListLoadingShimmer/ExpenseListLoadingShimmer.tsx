import { ReactNode } from "react";
import classes from './ExpenseListLoadingShimmer.module.scss'

const ExpenseListLoadingShimmer: React.FC<{children?: ReactNode}>  = ({children}) => {
    const shimmerLineClass = `${classes['shimmer-line']}`;
    return (
        <div className={classes['shimmer-wrapper']}>
            {Array.from({length: 6}, (_, k) => <div key={k} className={shimmerLineClass}></div>)}
            {Array.from({length: 3}, (_, k) => <div key={k} className={classes['square-box']}></div>)}
        </div>
    );

}


export default ExpenseListLoadingShimmer;
