import { InputHTMLAttributes, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(({label, className, ...rest}, ref) => {
    return (
      <>
        {label && (
          <label className="text-gray-700 mb-2 inline-block" htmlFor={rest.id}>
            {label}{rest.required ? <span className="required-astrict">*</span>: ''}
          </label>
        )}
        <input autoComplete="off" {...rest} ref={ref} className={'app-input ' + className} />
      </>
    );
  })

export default Input;
