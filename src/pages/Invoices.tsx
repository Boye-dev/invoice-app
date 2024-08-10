import { useState } from "react";
import Table, { IColumns } from "../shared/components/Table";
import { HiDotsHorizontal } from "react-icons/hi";
import TextInput from "../shared/components/TextInput";
import { FaSearch } from "react-icons/fa";
import Menu from "../shared/components/Menu";
import { DASHBOARD_PATHS } from "../constants/routes";
import { useNavigate } from "react-router-dom";
interface IData {
  name: string;
  date: string;
  client: string;
  id: string;
  price: string;
  status: string;
}
const Invoices = () => {
  const [selectedItems, setSelectedItems] = useState<IData[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const columns: IColumns<IData>[] = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "date",
      label: "Date",
    },
    {
      key: "client",
      label: "Client",
    },
    {
      key: "price",
      label: "Price",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "id",
      label: "",
      render: () => (
        <Menu
          target={<HiDotsHorizontal />}
          data={[
            { label: "Paid", onClick: () => {} },
            { label: "Paid", onClick: () => {} },
            { label: "Paid", onClick: () => {} },
          ]}
        />
      ),
    },
  ];
  const data: IData[] = [
    {
      name: "hello",
      id: "123",
      status: "Paid",
      price: "2000",
      client: "sdd",
      date: "sjkjk",
    },
    {
      name: "wef",
      id: "1234",
      status: "Paid",
      price: "2000",
      client: "sdd",
      date: "sjkjk",
    },
  ];
  const handleCheckedItems = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: IData
  ) => {
    if (e.target.checked) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems((prev) => {
        const items = [...prev];
        const filteredItems = items.filter((v) => v.id !== value.id);
        return filteredItems;
      });
    }
  };
  return (
    <>
      <div className="pt-10 px-3 md:px-10">
        <div className="flex mb-10">
          <TextInput
            rightSection={<FaSearch />}
            inputDivStyles="w-full md:w-[400px] "
            placeholder="Search"
            name="search"
            onChange={() => {}}
          />
        </div>
        <Table<IData>
          columns={columns}
          data={data}
          selectedItems={selectedItems}
          handleCheckedItems={handleCheckedItems}
          pageNumber={pageNumber}
          pageSize={pageSize}
          total={20}
          setPageSize={setPageSize}
          setPageNumber={setPageNumber}
          onRowItemClick={() => navigate(`${DASHBOARD_PATHS.EDIT_INVOICE}/2`)}
        />
      </div>
    </>
  );
};

export default Invoices;
