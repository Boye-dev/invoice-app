import React, {
  ForwardedRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { forwardRef } from "react";
import clsx from "clsx";
import { FaCheck, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

interface ISelectInput {
  placeholder?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  label?: string;
  name: string;
  onChange: (values: string | number | (string | number)[] | null) => void;
  value?: string;
  error?: boolean;
  helperText?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLDivElement>) => void;
  labelStyles?: string;
  inputStyles?: string;
  inputDivStyles?: string;
  showChip?: boolean;
  size?: "md" | "lg" | "xlg";
  rightSection?: React.ReactNode;
  leftSection?: React.ReactNode;
  multiple?: boolean;
  data: {
    label: string;
    value: string | number;
    render?: (val: any) => React.ReactNode;
  }[];
  renderOption?: (item: any) => React.ReactNode;
  defaultValue?: string | number | (string | number)[];
}
const SelectInput = forwardRef(
  (props: ISelectInput, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      placeholder,
      label,
      name,
      fullWidth,
      onChange,
      disabled,
      error,
      helperText,
      onMouseUp,
      labelStyles,
      inputStyles,
      inputDivStyles,
      leftSection,
      rightSection,
      size = "md",
      multiple = false,
      data,
      renderOption,
      defaultValue = null,
      showChip = false,
    } = props;
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState<
      string | number | (string | number)[] | null
    >(defaultValue);

    const baseInputStyles = `cursor-pointer bg-white border border-solid border-gray-900 outline-none px-3 py-3 px-4 rounded-lg text-sm placeholder:text-gray-400 focus:border-blue-400 focus:border-2 flex justify-between items-center`;
    const combinedInputStles = clsx(baseInputStyles, {
      [`${inputStyles}`]: Boolean(inputStyles),
      "border-2 border-red-700": error,
      "p-4": size === "lg",
      "bg-slate-200 border-slate-200 cursor-not-allowed": disabled,
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

    const inputRef = useRef<HTMLInputElement | null>(null);
    const dropDownRef = useRef<HTMLDivElement | null>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    useEffect(() => {
      if (disabled) setOpen(false);
    }, [disabled]);
    const [position, setPosition] = useState<{
      top: number;
      left: number;
      width: number;
      height: number;
    }>({
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    });
    const updatePosition = () => {
      if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setPosition({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
        if (dropDownRef.current) {
          const dropDownrect = dropDownRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          if (rect.bottom + dropDownrect.height > viewportHeight) {
            if (
              dropDownRef.current.style.transform !==
                `translateY(-${rect.height + dropDownrect.height}px)` ||
              dropDownRef.current.style.transform === `translateY(0px)`
            ) {
              dropDownRef.current.style.transform = `translateY(-${
                rect.height + dropDownrect.height
              }px)`;
            }
          } else {
            dropDownRef.current.style.transform = `translateY(0)`;
          }
        }
      }
    };
    useEffect(() => {
      if (dropDownRef.current) {
        updatePosition();
      }
    }, [open]);
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef?.current && dropDownRef?.current && e) {
        const outside =
          inputRef?.current.contains(e.target as Node) ||
          dropDownRef?.current.contains(e.target as Node);
        if (!outside) setOpen(false);
      }
    };
    useEffect(() => {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition);
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        window.removeEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition);

        document.addEventListener("mousedown", handleClickOutside);
      };
    }, []);
    const handleSelect = (item: {
      label: string;
      value: string | number;
      render?: ((val: any) => React.ReactNode) | undefined;
    }) => {
      const val = item.value;
      if (multiple) {
        setValues((prev) => {
          if (Array.isArray(prev)) {
            const allValues = [...prev];
            const isSelected = allValues.find((item) => item === val);
            if (isSelected) {
              const filteredItems = allValues.filter((item) => item !== val);
              return filteredItems;
            } else {
              allValues.push(val);
              return allValues;
            }
          } else {
            return [val];
          }
        });
      } else {
        if (!values) {
          setValues(val);
        }
        if (val === values) {
          setValues(null);
        } else {
          setValues(val);
        }
      }
    };
    useEffect(() => {
      updatePosition();
      onChange(values);
    }, [values]);
    return (
      <>
        <div className={combinedInputDiv}>
          {label && (
            <label className={combinedLabelStles} htmlFor={name}>
              {label}
            </label>
          )}
          <div className="w-full h-auto">
            <div
              className={combinedInputStles}
              ref={inputRef}
              onClick={() => {
                if (!disabled) {
                  setOpen(!open);
                  updatePosition();
                }
              }}
            >
              <div className="flex items-center">
                {leftSection && (
                  <div className="flex items-center mr-3">{leftSection}</div>
                )}

                <div className="flex flex-wrap gap-1" onMouseUp={onMouseUp}>
                  {multiple ? (
                    showChip && Array.isArray(values) && values.length > 0 ? (
                      values.map((v) => (
                        <div
                          key={v}
                          className="bg-slate-200 px-2 rounded-2xl flex justify-between items-center "
                        >
                          <p className="text-center min-w-10 text-xs">{v}</p>
                          <FaXmark size={12} />
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500">{placeholder}</p>
                    )
                  ) : values ? (
                    renderOption ? (
                      renderOption(values)
                    ) : (
                      <p>{values}</p>
                    )
                  ) : (
                    <p className="text-slate-500">{placeholder}</p>
                  )}
                </div>
              </div>
              {rightSection ? (
                <div className="flex items-center ">{rightSection}</div>
              ) : (
                <div>
                  <FaChevronUp size={8} className="text-slate-400" />
                  <FaChevronDown size={8} className="text-slate-400" />
                </div>
              )}
            </div>

            <div
              ref={dropDownRef}
              className={`h-auto fixed bg-white py-2 rounded-md shadow-md max-h-[300px] overflow-auto z-[2000] ${
                !open ? "hidden" : ""
              }`}
              style={{
                width: position.width,
                top: position.top + position.height,
              }}
            >
              {data.map((item) => (
                <>
                  <div
                    className="cursor-pointer flex items-center hover:bg-slate-100"
                    key={item.value}
                    onClick={() => handleSelect(item)}
                  >
                    {multiple
                      ? Array.isArray(values) &&
                        values.find((val) => val === item.value) && (
                          <FaCheck className="text-slate-500 ml-3" size={10} />
                        )
                      : values === item.value && (
                          <FaCheck className="text-slate-500 ml-3" size={10} />
                        )}
                    {item.render ? (
                      <div className="w-full">
                        {item.render(item) as React.ReactNode}
                      </div>
                    ) : (
                      <p className="p-2"> {item.label}</p>
                    )}
                  </div>
                  <hr className="last:hidden" />
                </>
              ))}
            </div>
          </div>
          {error && <p className="text-red-700 text-xs ">{helperText}</p>}
        </div>
      </>
    );
  }
);

export default SelectInput;
