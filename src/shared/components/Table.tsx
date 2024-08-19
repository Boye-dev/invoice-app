import React, { useEffect, useState } from "react";
import { FaSortAlphaDown, FaSortAlphaUpAlt } from "react-icons/fa";
import TablePagination, { ITablePagination } from "./TablePagination";
import LoadingLogo from "./LoadingLogo";
import empty from "../../assets/empty.webp";
export interface IColumns<T> {
  key: keyof T;
  label: string;
  width?: string | number;
  sort?: boolean;
  render?: (_row: T) => JSX.Element;
}
interface ITable<T> extends ITablePagination {
  columns: IColumns<T>[];
  data: T[];
  selectedItems?: T[];
  handleCheckedItems?: (
    e: React.ChangeEvent<HTMLInputElement>,
    value: T
  ) => void;
  checkbox?: boolean;
  onRowItemClick?: (value: T) => void;
  onSortClick?: (sort: string) => void;
  loading?: boolean;
}
const Table = <T extends { _id?: string; id?: string }>(props: ITable<T>) => {
  const {
    columns,
    data,
    checkbox = false,
    handleCheckedItems,
    onRowItemClick,
    onSortClick,
    pageNumber,
    pageSize,
    total,
    onRowsPerPageChange,
    onPageChange,
    loading,
  } = props;
  const [sort, setSort] = useState("");
  useEffect(() => {
    if (sort) {
      onSortClick && onSortClick(sort);
    }
  }, [sort, onSortClick]);
  const renderHead = () => (
    <tr className="w-full">
      {checkbox && <th className="min-w-[50px]"></th>}
      {columns.map((col) => {
        return (
          <th key={col.key as string} className={`pb-5 min-w-[200px]`}>
            <div className="flex items-center">
              <p>{col.label as React.ReactNode}</p>
              {col.sort ? (
                sort.includes(col.key as string) ? (
                  sort.startsWith("-") ? (
                    <FaSortAlphaUpAlt
                      className="ml-2 cursor-pointer"
                      onClick={() => setSort(`${col.key as string}`)}
                    />
                  ) : (
                    <FaSortAlphaDown
                      className="ml-2 cursor-pointer"
                      onClick={() => setSort(`-${col.key as string}`)}
                    />
                  )
                ) : (
                  <FaSortAlphaDown
                    className="ml-2 cursor-pointer"
                    onClick={() => setSort(`-${col.key as string}`)}
                  />
                )
              ) : (
                <span></span>
              )}
            </div>
          </th>
        );
      })}
    </tr>
  );
  const renderBody = () => {
    return (
      data.length > 0 &&
      data?.map((value) => (
        <tr
          className="odd:bg-slate-50 hover:bg-slate-100 cursor-pointer"
          key={value._id}
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
      ))
    );
  };

  return (
    <>
      <div className="bg-white p-5 w-full rounded-lg overflow-x-auto shadow-md">
        <div className="w-full overflow-x-auto ">
          <table className="w-full">
            <thead className="border-b">{renderHead()}</thead>

            {!loading && data.length > 0 && <tbody>{renderBody()}</tbody>}
          </table>
          {!loading && data.length === 0 && (
            <div className="w-full flex justify-center items-center min-h-[200px]">
              <div className="w-[200px]">
                <img src={empty} className="w-full" />
              </div>
            </div>
          )}
          {loading && (
            <div className="w-full flex justify-center items-center min-h-[200px]">
              <div className="w-20">
                <LoadingLogo />
              </div>
            </div>
          )}
        </div>
        {loading || (
          <TablePagination
            pageNumber={pageNumber}
            pageSize={pageSize}
            total={total}
            onRowsPerPageChange={onRowsPerPageChange}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </>
  );
};

export default Table;
