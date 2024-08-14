import React, { ForwardedRef, useState } from "react";
import { forwardRef } from "react";
import clsx from "clsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface IPasswordInput {
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
  leftSection?: React.ReactNode;
  withAsterisks?: boolean;
}
const PasswordInput = forwardRef(
  (props: IPasswordInput, ref: ForwardedRef<HTMLInputElement>) => {
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
      withAsterisks,
      size = "md",
      leftSection,
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
    const [showPassword, setShowPassword] = useState(false);
    return (
      <>
        <div className={combinedInputDiv}>
          {label && (
            <label className={combinedLabelStles} htmlFor={name}>
              {label}
              {withAsterisks && <span className="text-red-700">*</span>}
            </label>
          )}
          <div className="w-full h-auto relative">
            {leftSection && (
              <div className="absolute flex items-center top-4 left-3 ">
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
              type={showPassword ? "text" : "password"}
              className={combinedInputStles}
            />
            <div
              className="absolute flex items-center top-4 right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          {error && <p className="text-red-700 text-xs">{helperText}</p>}
        </div>
      </>
    );
  }
);

export default PasswordInput;
