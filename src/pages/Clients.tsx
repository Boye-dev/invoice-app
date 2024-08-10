import { useState } from "react";
import Table, { IColumns } from "../shared/components/Table";
import TextInput from "../shared/components/TextInput";
import { FaPlus, FaSearch } from "react-icons/fa";
import { DASHBOARD_PATHS } from "../constants/routes";
import { useNavigate } from "react-router-dom";
import Button from "../shared/components/Button";
interface IData {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  id: string;
}
const Clients = () => {
  const [selectedItems, setSelectedItems] = useState<IData[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const columns: IColumns<IData>[] = [
    {
      key: "firstname",
      label: "First Name",
    },
    {
      key: "lastname",
      label: "Last Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "phoneNumber",
      label: "Phone Number",
    },
  ];
  const data: IData[] = [];
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
        <div className="flex mb-10 justify-between items-centers w-full flex-wrap">
          <TextInput
            rightSection={<FaSearch />}
            inputDivStyles="w-full md:w-[400px] "
            placeholder="Search"
            name="search"
            onChange={() => {}}
          />
          <Button
            buttonStyles="w-full md:w-auto mt-5 md:mt-0"
            text="New Client"
            leftSection={<FaPlus />}
            onClick={() => navigate(DASHBOARD_PATHS.NEW_CLIENT)}
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
          onRowItemClick={() => navigate(`${DASHBOARD_PATHS.EDIT_CLIENT}/2`)}
        />
      </div>
    </>
  );
};

export default Clients;
