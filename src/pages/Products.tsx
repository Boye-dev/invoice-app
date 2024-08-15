import Table, { IColumns } from "../shared/components/Table";
import TextInput from "../shared/components/TextInput";
import { FaPlus, FaSearch } from "react-icons/fa";
import { DASHBOARD_PATHS } from "../constants/routes";
import { useNavigate } from "react-router-dom";
import Button from "../shared/components/Button";
import useFilter from "../hooks/useFilter";
import { IProduct, IProductParams } from "../interfaces/product.interface";
import { getProducts } from "../services/product.service";
import { useQuery } from "@tanstack/react-query";
import { useTitle } from "../hooks/useTitle";
const Products = () => {
  useTitle("Products | Invoice App");

  const {
    params: tableParams,
    setParams: setTableParams,
    search,
    setSearch,
  } = useFilter<IProductParams>({
    defaultParams: {
      page: 0,
      pageSize: 10,
    },
  });

  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["products", tableParams],
    queryFn: () => getProducts(tableParams),
  });
  const columns: IColumns<IProduct>[] = [
    {
      key: "image",
      label: "Image",
      render: (item) => <img src={item.image} className="w-10 h-10" />,
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "price",
      label: "Price",
    },
  ];
  return (
    <>
      <div className="pt-10 px-3 md:px-10">
        <div className="flex mb-10 justify-between items-centers w-full flex-wrap">
          <TextInput
            value={search}
            rightSection={<FaSearch />}
            inputDivStyles="w-full md:w-[400px] "
            placeholder="Search"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            buttonStyles="w-full md:w-auto mt-5 md:mt-0"
            text="New Product"
            leftSection={<FaPlus />}
            onClick={() => navigate(DASHBOARD_PATHS.NEW_PRODUCT)}
          />
        </div>
        <Table<IProduct>
          columns={columns}
          data={data?.data.data?.results || []}
          pageNumber={tableParams.page}
          pageSize={tableParams.pageSize}
          total={data?.data.data?.total || 0}
          onRowsPerPageChange={(val) =>
            val && setTableParams({ ...tableParams, pageSize: val, page: 0 })
          }
          onPageChange={(val) => {
            console.log(val);
            setTableParams((prev) => {
              return { ...prev, page: val };
            });
          }}
          onRowItemClick={(row) =>
            navigate(`${DASHBOARD_PATHS.EDIT_PRODUCT}/${row._id}`)
          }
          loading={isLoading}
        />
      </div>
    </>
  );
};

export default Products;
