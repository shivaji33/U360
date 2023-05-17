import React, { SelectHTMLAttributes, forwardRef } from 'react';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  className?: string;
  optionValue: string;
  optionLabel: string;
  options: any[];
  isHideSelectOptionFallback?: boolean;
}

const Select = forwardRef<HTMLSelectElement, Props>(({ label, className, options,optionValue,optionLabel,isHideSelectOptionFallback, ...rest }, ref) => {
  return (
    <div>
      {label && <label className="text-gray-700 mb-2 inline-block" htmlFor={rest.id}>{label}{rest.required ? <span className="required-astrict">*</span>: ''}</label>}
      <select {...rest} ref={ref} className={'app-input ' + className}>
        {!isHideSelectOptionFallback && <option key="defaultValue" value={null}>Select</option>}
        {options.map((option) => (
          <option key={option[optionValue]} value={JSON.stringify(option)}>
            {option[optionLabel]}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;