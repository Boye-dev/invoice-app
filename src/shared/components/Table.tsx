import React from "react";
import { FaSortAlphaDown } from "react-icons/fa";
import TablePagination, { ITablePagination } from "./TablePagination";

export interface IColumns<T> {
  key: keyof T;
  label: string;
  width?: string | number;
  render?: (_row: T) => JSX.Element;
}
interface ITable<T> extends ITablePagination {
  columns: IColumns<T>[];
  data: T[];
  selectedItems: T[];
  handleCheckedItems?: (
    e: React.ChangeEvent<HTMLInputElement>,
    value: T
  ) => void;
  checkbox?: boolean;
  onRowItemClick?: (value: T) => void;
}
const Table = <T extends { id: string }>(props: ITable<T>) => {
  const {
    columns,
    data,
    checkbox = false,
    handleCheckedItems,
    onRowItemClick,
    pageNumber,
    pageSize,
    total,
    setPageNumber,
    setPageSize,
  } = props;

  const renderHead = () => (
    <tr className="w-full">
      {checkbox && <th className="min-w-[50px]"></th>}
      {columns.map((col) => {
        return (
          <th key={col.key as string} className={`pb-5 min-w-[200px]`}>
            <div className="flex items-center">
              <p>{col.label as React.ReactNode}</p>
              {col.key !== "id" && <FaSortAlphaDown className="ml-2" />}
              {/* <FaSortAlphaUpAlt /> */}
            </div>
          </th>
        );
      })}
    </tr>
  );
  const renderBody = () => {
    return data.map((value) => (
      <tr
        className="odd:bg-slate-50 hover:bg-slate-100 cursor-pointer"
        key={value.id}
        onClick={() => onRowItemClick && onRowItemClick(value)}
      >
        {checkbox && (
          <td>
            <div className="flex justify-center items-center">
              <input
                type="checkbox"
                onChange={(e) =>
                  handleCheckedItems && handleCheckedItems(e, value)
                }
              />
            </div>
          </td>
        )}
        {columns.map((col) => (
          <td
            key={col.key as string}
            className={`py-3 border-b`}
            style={{ width: `calc(100% / ${columns.length})` }}
          >
            <div>
              {col.render ? (
                (col.render(value) as React.ReactNode)
              ) : (
                <p>{value[col.key] as React.ReactNode}</p>
              )}
            </div>
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <>
      <div className="bg-white p-5 w-full rounded-lg overflow-x-auto shadow-md">
        <div className="w-full overflow-x-auto ">
          <table className="w-full">
            <thead className="border-b">{renderHead()}</thead>
            <tbody>{renderBody()}</tbody>
          </table>
        </div>
        <TablePagination
          pageNumber={pageNumber}
          pageSize={pageSize}
          total={total}
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
        />
      </div>
    </>
  );
};

export default Table;
