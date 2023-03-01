import classes from './Input.module.scss';

const Input: React.FC<{name?: string, id?: string, className?: string, label?: string}> = (props) => {
    const {name, id, className, label} = props;
    const styles = `${className}`;
return (
    <div className={classes['input-wrapper']}>
    {label && <label className='text-gray-700' htmlFor={id}>{label}</label>}
    <input type="text" className={styles} name={name} id={id} />
    </div>
);
}

export default Input;