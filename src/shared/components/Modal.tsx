import React, { useEffect, useRef } from "react";
import clsx from "clsx";
interface IModal {
  close: () => void;
  content: React.ReactNode;
  open: boolean;
}
const Modal = (props: IModal) => {
  const { close, content, open } = props;
  const modalRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (backgroundRef.current) {
      backgroundRef.current.addEventListener("click", (e) => {
        if (backgroundRef.current === e.target) {
          close();
        }
      });
    }
  }, []);
  const baseStyles =
    "top-0 left-0 bg-gray-400/30 w-full h-dvh flex justify-center items-center";
  const combinedStyles = clsx(baseStyles, {
    hidden: !open,
    "flex fixed": open,
  });
  return (
    <div ref={backgroundRef} className={combinedStyles}>
      <div
        className="min-w-full md:min-w-[300px] h-[200px] bg-white rounded-md"
        ref={modalRef}
      >
        {content}
      </div>
    </div>
  );
};

export default Modal;
