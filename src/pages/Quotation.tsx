import Table, { IColumns } from "../shared/components/Table";
import TextInput from "../shared/components/TextInput";
import { FaPlus, FaSearch } from "react-icons/fa";
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
import Button from "../shared/components/Button";
import { useTitle } from "../hooks/useTitle";

const Quotation = () => {
  useTitle("Quotations | Invoice App");

  const {
    params: tableParams,
    setParams: setTableParams,
    search,
    setSearch,
  } = useFilter<IInvoiceParams>({
    defaultParams: {
      page: 0,
      pageSize: 10,
      type: InvoiceType.QUOTATION,
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
      sort: true,
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
            text="New Quotation"
            leftSection={<FaPlus />}
            onClick={() => navigate(DASHBOARD_PATHS.NEW_QUOTATION)}
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
            setTableParams((prev) => {
              return { ...prev, page: val };
            });
          }}
          onRowItemClick={(row) =>
            navigate(`${DASHBOARD_PATHS.EDIT_QUOTATION}/${row._id}`)
          }
          onSortClick={(sort) => {
            setTableParams({ ...tableParams, sort });
          }}
          loading={isLoading}
        />
      </div>
    </>
  );
};

export default Quotation;
