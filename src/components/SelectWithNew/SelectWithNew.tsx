import classes from "./SelectWithNew.module.scss";
import { ChangeEvent, forwardRef, SelectHTMLAttributes, useImperativeHandle, useRef, useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";



interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  className?: string;
  options: any[];
  optionLabel: string;
  optionValue: string;
  onAddNewItem?: (value: string) => void;
  onChange?: (value: any) => void
}

export interface SelectWithNewRef {
  cancelCreateItem: () => void;
}

const SelectWithNew = forwardRef<SelectWithNewRef, Props>(
  ({ label, className,options,optionLabel,optionValue, onAddNewItem,onChange, ...rest}, ref) => {

    const [isDropdownShow, setIsDropdownShow] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [isCreateNewItem, setIsCreateNewItem] = useState(false);
    const parentDivClass = `${classes["multi-select-wrapper"]}`;
    const [selectedOption, setSelectedOption] = useState({});
    const searchInputRef = useRef<HTMLInputElement>(null);

    const triggerDropdown = () => {
      setIsDropdownShow(!isDropdownShow);
    };

    const backdropHandler = () => {
      setIsDropdownShow(false);
      setSearchInput('');
      setIsCreateNewItem(false);
    };
    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event?.target?.value;
      setSearchInput(value);
    };
    const NO_DATA = "NO_DATA";
    const ADD_NEW_ITEM = "ADD_NEW_ITEM";
    const addNewItem = () => {
      setIsCreateNewItem(true);
      searchInputRef.current.focus();
    };
    const cancelCreateItem = () => {
      setIsCreateNewItem(false);
      setSearchInput("");
    };
    const onSaveItem = () => {
      searchInput?.trim()?.length && onAddNewItem && onAddNewItem(searchInput?.trim())
    }
    const onSelectOption = (option: any) => {
      setSelectedOption(option);
      triggerDropdown();
      onChange(selectedOption);
    }
    useImperativeHandle(ref, () => {
      return {
        cancelCreateItem
      }
    });
    return (
      <>
        {label && (
          <label className="text-gray-700 mb-2 inline-block" htmlFor={rest.id}>
            {label}
            {rest.required ? <span className="required-astrict">*</span> : ""}
          </label>
        )}
        <div className={parentDivClass}>
          <Input
            name={rest.name}
            id={rest.id}
            readOnly
            onClick={triggerDropdown}
            value={selectedOption[optionLabel] || ''}
            className={`${className}`}
          />
          {isDropdownShow && (
            <>
              <div className="backdrop" onClick={backdropHandler}></div>
              <div className={`${classes["dropdown"]} bg-white shadow-md`}>
                {(!!options?.length || isCreateNewItem) && (
                  <Input
                    className="input-sm"
                    value={searchInput}
                    onChange={inputChangeHandler}
                    ref={searchInputRef}
                  />
                )}
                {isCreateNewItem && (
                  <>
                    <Button
                      type="button"
                      className="btn-sm mt-4 ml-4 btn-primary float-right"
                      onClick={onSaveItem}
                    >
                      Save
                    </Button>
                    <Button
                      type="button"
                      className="btn-sm mt-4 float-right btn-secondary"
                      onClick={cancelCreateItem}
                    >
                      Cancel
                    </Button>
                  </>
                )}
                {!isCreateNewItem && (
                  <ul className={`${classes["option-list"]}`}>
                    {
                      <li
                        className={`${classes["option"]} ${classes["add-new-item"]}`}
                        key={ADD_NEW_ITEM}
                        onClick={addNewItem}
                      >
                        + Add New Item
                      </li>
                    }
                    {options
                      .filter((option) =>
                        option[optionLabel]
                          ?.toLowerCase()
                          ?.includes(searchInput?.toLowerCase())
                      )
                      .map((option) => (
                        <li className={`${classes["option"]} ${selectedOption && selectedOption[optionValue] === option[optionValue] ? classes['active'] : ''}`} key={option[optionValue]} 
                        onClick={onSelectOption.bind(this,option)}>
                          {option[optionLabel]}
                        </li>
                      ))}
                    {!options?.length && (
                      <li className={classes["option"]} key={NO_DATA}>
                        No Data
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </>
    );
  }
);

export default SelectWithNew;
