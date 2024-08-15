import Table, { IColumns } from "../shared/components/Table";
import TextInput from "../shared/components/TextInput";
import { FaSearch } from "react-icons/fa";
import { DASHBOARD_PATHS } from "../constants/routes";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "../services/invoice.service";
import {
  IInvoice,
  IInvoiceParams,
  InvoiceType,
} from "../interfaces/invoice.interface";
import {
  convertAllUpperCaseToSentenceCase,
  getStatusColor,
} from "../utils/textHelpers";
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
        <div
          className="w-[120px] rounded-2xl h-auto py-2 flex items-center justify-center"
          style={{
            backgroundColor: getStatusColor(row.paymentStatus),
          }}
        >
          <p className="text-white w-auto">
            {convertAllUpperCaseToSentenceCase(row.paymentStatus)}
          </p>
        </div>
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
