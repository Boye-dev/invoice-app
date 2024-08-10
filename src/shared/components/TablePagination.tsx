import React from "react";
import SelectInput from "./SelectInput";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
export interface ITablePagination {
  total: number;
  pageNumber: number;
  pageSize: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}
const TablePagination = ({
  pageNumber,
  pageSize,
  total,
  setPageNumber,
  setPageSize,
}: ITablePagination) => {
  const renderValue = () => {
    if (pageNumber === 0) {
      return pageSize > total ? total : pageSize;
    } else if (pageSize * (pageNumber + 1) >= total) {
      return total;
    } else {
      return pageSize * (pageNumber + 1);
    }
  };
  return (
    <>
      <div className="flex justify-end mt-5 items-center gap-5">
        <p>Rows Per Page</p>
        <SelectInput
          inputStyles="min-w-20"
          name="pagination"
          data={[
            {
              label: "5",
              value: 5,
            },
            {
              label: "10",
              value: 10,
            },
            {
              label: "20",
              value: 20,
            },
            {
              label: "30",
              value: 30,
            },
          ]}
          onChange={(val) => {
            setPageSize(val as number);
            setPageNumber(0);
          }}
          defaultValue={10}
        />
        <p>
          {pageNumber * pageSize + 1}-{renderValue()} of {total}
        </p>
        <div>
          <FaChevronLeft
            className={`${
              pageNumber === 0
                ? "text-slate-300 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => pageNumber !== 0 && setPageNumber(pageNumber - 1)}
          />
        </div>

        <div>
          <FaChevronRight
            className={`${
              pageSize * (pageNumber + 1) >= total
                ? "text-slate-300 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => {
              if (pageSize * (pageNumber + 1) < total) {
                setPageNumber(pageNumber + 1);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default TablePagination;
