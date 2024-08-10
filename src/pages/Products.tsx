import { useState } from "react";
import Table, { IColumns } from "../shared/components/Table";
import TextInput from "../shared/components/TextInput";
import { FaPlus, FaSearch } from "react-icons/fa";
import { DASHBOARD_PATHS } from "../constants/routes";
import { useNavigate } from "react-router-dom";
import Button from "../shared/components/Button";
interface IData {
  name: string;
  price: string | number;
  description: string;
  picture: string;
  id: string;
}
const Products = () => {
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
      key: "price",
      label: "Price",
    },
    {
      key: "picture",
      label: "Picture",
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
            text="New Product"
            leftSection={<FaPlus />}
            onClick={() => navigate(DASHBOARD_PATHS.NEW_PRODUCT)}
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
          onRowItemClick={() => navigate(`${DASHBOARD_PATHS.EDIT_PRODUCT}/2`)}
        />
      </div>
    </>
  );
};

export default Products;
