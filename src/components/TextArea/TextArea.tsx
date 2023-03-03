import { forwardRef, TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    className?: string;
  }
  

const TextArea: React.FC<Props> = forwardRef<HTMLTextAreaElement ,Props>(({label, className, ...rest}, ref) => {
  return (<>
  {label && (
    <label className="text-gray-700 mb-2 inline-block" htmlFor={rest.id}>
      {label}{rest.required ? <span className="required-astrict">*</span>: ''}
    </label>
  )}
  <textarea autoComplete="off" {...rest} ref={ref} className={'app-input ' + className} />
</>);
})

export default TextArea;