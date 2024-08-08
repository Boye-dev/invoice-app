import React, { ForwardedRef } from "react";
import { forwardRef } from "react";
import clsx from "clsx";
interface ITextInput {
  placeholder?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  label?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: boolean;
  helperText?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  labelStyles?: string;
  inputStyles?: string;
  size?: "md" | "lg" | "xlg";
  rightSection?: React.ReactNode;
  leftSection?: React.ReactNode;
}
const TextInput = forwardRef(
  (props: ITextInput, ref: ForwardedRef<HTMLInputElement>) => {
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
      "w-full": fullWidth,
      "w-auto": !fullWidth,
    });

    const combinedLabelStles = clsx("font-bold", {
      [`${labelStyles}`]: Boolean(inputStyles),
    });
    return (
      <>
        <div className={combinedInputDiv}>
          {label && (
            <label className={combinedLabelStles} htmlFor={name}>
              {label}
            </label>
          )}
          <div className="w-full h-auto relative">
            {leftSection && (
              <div className="absolute flex items-center top-4 left-3">
                {leftSection}
              </div>
            )}
            <input
              id={name}
              ref={ref}
              disabled={disabled}
              value={value}
              name={name}
              placeholder={placeholder}
              onChange={(e) => onChange(e)}
              onBlur={(e) => onBlur && onBlur(e)}
              onKeyUp={(e) => onKeyUp && onKeyUp(e)}
              type="text"
              className={combinedInputStles}
            />
            {rightSection && (
              <div className="absolute flex items-center top-4 right-3 ">
                {rightSection}
              </div>
            )}
          </div>
          {error && <p className="text-red-700 text-xs">{helperText}</p>}
        </div>
      </>
    );
  }
);

export default TextInput;
