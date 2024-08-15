import SelectInput from "./SelectInput";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
export interface ITablePagination {
  total: number;
  pageNumber: number;
  pageSize: number;
  onRowsPerPageChange: (_val: number) => void;
  onPageChange: (_val: number) => void;
}
const TablePagination = ({
  pageNumber,
  pageSize,
  total,
  onRowsPerPageChange,
  onPageChange,
}: ITablePagination) => {
  const renderValue = () => {
    if (total - pageNumber * pageSize > pageSize) {
      return (pageNumber + 1) * pageSize;
    }
    return total;
  };
  return (
    <>
      <div className="flex justify-end mt-5 items-center gap-5">
        <p>Rows Per Page</p>
        <SelectInput
          value={pageSize}
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
            typeof val === "number" && onRowsPerPageChange(val);
          }}
          defaultValue={pageSize}
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
            onClick={() => pageNumber !== 0 && onPageChange(pageNumber - 1)}
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
              if (total - pageNumber * pageSize > pageSize) {
                onPageChange(pageNumber + 1);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default TablePagination;
