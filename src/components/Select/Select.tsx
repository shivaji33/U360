import React, { SelectHTMLAttributes, forwardRef } from 'react';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  className?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, Props>(({ label, className, options, ...rest }, ref) => {
  return (
    <div>
      {label && <label className="text-gray-700 mb-2 inline-block" htmlFor={rest.id}>{label}{rest.required ? <span className="required-astrict">*</span>: ''}</label>}
      <select {...rest} ref={ref} className={'app-input ' + className}>
        <option key="defaultValue" value={null}>Select</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;