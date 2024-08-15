import Table, { IColumns } from "../shared/components/Table";
import { HiDotsHorizontal } from "react-icons/hi";
import TextInput from "../shared/components/TextInput";
import { FaSearch } from "react-icons/fa";
import Menu from "../shared/components/Menu";
import { DASHBOARD_PATHS } from "../constants/routes";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "../services/invoice.service";
import {
  IInvoice,
  IInvoiceParams,
  InvoiceType,
} from "../interfaces/invoice.interface";
import { convertAllUpperCaseToSentenceCase } from "../utils/textHelpers";
import useFilter from "../hooks/useFilter";
import { useTitle } from "../hooks/useTitle";

const Invoices = () => {
  useTitle("All Invoices | Invoice App");

  const {
    params: tableParams,
    setParams: setTableParams,
    search,
    setSearch,
  } = useFilter<IInvoiceParams>({
    defaultParams: {
      page: 0,
      pageSize: 10,
      type: InvoiceType.INVOICE,
    },
  });

  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["invoices", tableParams],
    queryFn: () => getInvoices(tableParams),
  });

  const columns: IColumns<IInvoice>[] = [
    {
      key: "invoiceNumber",
      label: "Number",
    },
    {
      key: "name",
      label: "Name",
    },

    {
      key: "paymentStatus",
      label: "Payment Status",
      render: (row) => (
        <p>{convertAllUpperCaseToSentenceCase(row.paymentStatus)}</p>
      ),
    },

    {
      key: "client",
      label: "Client",
      render: (row) => (
        <p>
          {row.client.lastname} {row.client.firstname}
        </p>
      ),
    },

    {
      key: "_id",
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

  return (
    <>
      <div className="pt-10 px-3 md:px-10">
        <div className="flex mb-10">
          <TextInput
            value={search}
            rightSection={<FaSearch />}
            inputDivStyles="w-full md:w-[400px] "
            placeholder="Search"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Table<IInvoice>
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
            setTableParams((prev: IInvoiceParams) => {
              return { ...prev, page: val };
            });
          }}
          onRowItemClick={(row) =>
            navigate(`${DASHBOARD_PATHS.EDIT_INVOICE}/${row._id}`)
          }
          loading={isLoading}
        />
      </div>
    </>
  );
};

export default Invoices;
