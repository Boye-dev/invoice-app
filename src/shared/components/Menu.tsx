import React, {
  ForwardedRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { forwardRef } from "react";

interface IMenu {
  disabled?: boolean;
  data: {
    label?: string;
    onClick?: (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
    render?: (val: any) => React.ReactNode;
  }[];
  target: React.ReactNode;
}
const Menu = forwardRef((props: IMenu, ref: ForwardedRef<HTMLInputElement>) => {
  const { disabled, data, target } = props;
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <div>
        <div className="w-full h-auto">
          <div
            ref={inputRef}
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) {
                setOpen(!open);
                updatePosition();
              }
            }}
          >
            {target}
          </div>
          <div
            ref={dropDownRef}
            className={`h-auto min-w-20 fixed top-0 left-0 bg-white py-2 rounded-md shadow-md max-h-[300px] overflow-auto z-[4000] ${
              !open ? "hidden" : ""
            } `}
            style={{
              top: position.top + position.height,
              left: position.left,
            }}
          >
            {data.map((item) => (
              <div key={item.label}>
                {item.render ? (
                  <div className="w-full">
                    {item.render(item) as React.ReactNode}
                  </div>
                ) : (
                  <div
                    className="cursor-pointer flex items-center hover:bg-slate-100"
                    key={JSON.stringify(item)}
                    onClick={(e) => {
                      e.stopPropagation();
                      item.onClick && item.onClick(e);
                      setOpen(false);
                    }}
                  >
                    <p className="p-2">{item.label}</p>
                  </div>
                )}
                <hr className="last:hidden" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
});

export default Menu;
