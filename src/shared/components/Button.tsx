import clsx from "clsx";
import React from "react";
import Loader from "./Loader";

interface IButton {
  text: string;
  color?: string;
  fullWidth?: boolean;
  variant?: "contained" | "outlined" | "text";
  size?: "md" | "lg" | "xlg";
  disabled?: boolean;
  onClick?: () => void;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  buttonStyles?: string;
  loading?: boolean;
}
const Button = (props: IButton) => {
  const {
    loading,
    text,
    fullWidth,
    variant = "contained",
    size = "md",
    disabled,
    onClick,
    leftSection,
    rightSection,
    buttonStyles,
  } = props;
  const baseButtonStyles = `rounded-md px-5 h-12 outline-none focus:shadow focus:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed hover:opacity-80 disabled:opacity-100 disabled:text-gray-300 `;
  const combinedButtonStyles = clsx(baseButtonStyles, {
    "w-full": fullWidth,
    [`${buttonStyles}`]: Boolean(buttonStyles),
    [`text-blue-900`]: variant === "text" || variant === "outlined",
    [`border border-solid border-blue-900`]: variant === "outlined",
    "text-white bg-blue-900": variant === "contained",
    "h-14": size === "lg",
    "h-16": size === "xlg",
  });
  return (
    <>
      <button
        className={combinedButtonStyles}
        disabled={disabled || loading}
        onClick={onClick}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-5">
            <Loader className="fill-white" />
          </div>
        ) : (
          <div className="flex items-center justify-center gap-5">
            {leftSection && leftSection}
            {text}
            {rightSection && rightSection}
          </div>
        )}
      </button>
    </>
  );
};

export default Button;
