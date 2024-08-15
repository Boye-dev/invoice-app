import React, { ForwardedRef } from "react";
import { forwardRef } from "react";
import clsx from "clsx";
interface ITextInput {
  placeholder?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  label?: string;
  name: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value?: string;
  error?: boolean;
  helperText?: string;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
  onKeyUp?: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  labelStyles?: string;
  inputStyles?: string;
  inputDivStyles?: string;
  size?: "md" | "lg" | "xlg";
  rightSection?: React.ReactNode;
  leftSection?: React.ReactNode;
  withAsterisks?: boolean;
  textarea?: boolean;
}
const TextInput = forwardRef((props: ITextInput, ref: ForwardedRef<any>) => {
  const {
    placeholder,
    label,
    name,
    fullWidth,
    value,
    onChange,
    disabled,
    error,
    helperText,
    onBlur,
    onKeyUp,
    labelStyles,
    inputStyles,
    leftSection,
    rightSection,
    size = "md",
    inputDivStyles,
    withAsterisks,
    textarea,
  } = props;
  const baseInputStyles = `w-full border border-solid border-gray-900 outline-none p-3 px-4 rounded-lg text-sm placeholder:text-gray-400 focus:border-blue-400 focus:border-2 after:c`;
  const combinedInputStles = clsx(baseInputStyles, {
    [`${inputStyles}`]: Boolean(inputStyles),
    "border-2 border-red-700": error,
    "p-4": size === "lg",
    "pl-10": Boolean(leftSection),
  });

  const inputDiv = "flex flex-col gap-1 ";
  const combinedInputDiv = clsx(inputDiv, {
    [`${inputDivStyles}`]: Boolean(inputDivStyles),
    "w-full": fullWidth,
    "w-auto": !fullWidth,
  });

  const combinedLabelStles = clsx("font-bold", {
    [`${labelStyles}`]: Boolean(labelStyles),
  });
  return (
    <>
      <div className={combinedInputDiv}>
        {label && (
          <label className={combinedLabelStles} htmlFor={name}>
            {label}
            {withAsterisks && <span className="text-red-700">*</span>}
          </label>
        )}
        <div className="h-auto relative">
          {leftSection && (
            <div className="absolute flex items-center top-4 left-3">
              {leftSection}
            </div>
          )}
          {textarea ? (
            <textarea
              id={name}
              ref={ref}
              disabled={disabled}
              value={value}
              name={name}
              placeholder={placeholder}
              onChange={(e) => onChange && onChange(e)}
              onBlur={(e) => onBlur && onBlur(e)}
              onKeyUp={(e) => onKeyUp && onKeyUp(e)}
              className={combinedInputStles}
            ></textarea>
          ) : (
            <input
              id={name}
              ref={ref}
              disabled={disabled}
              value={value}
              name={name}
              placeholder={placeholder}
              onChange={(e) => onChange && onChange(e)}
              onBlur={(e) => onBlur && onBlur(e)}
              onKeyUp={(e) => onKeyUp && onKeyUp(e)}
              type="text"
              className={combinedInputStles}
            />
          )}
          {rightSection && (
            <div className="absolute  flex items-center top-4 right-3 ">
              {rightSection}
            </div>
          )}
        </div>
        {error && <p className="text-red-700 text-xs">{helperText}</p>}
      </div>
    </>
  );
});

export default TextInput;
