import TextInput from "../shared/components/TextInput";
import Button from "../shared/components/Button";
import SelectInput from "../shared/components/SelectInput";
import { getProducts } from "../services/product.service";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "../services/client.service";
import Menu from "../shared/components/Menu";
import { FaUsers } from "react-icons/fa";
import { CreateInvoice, PaymentStatus } from "../interfaces/invoice.interface";
import { convertAllUpperCaseToSentenceCase } from "../utils/textHelpers";
import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormReturn,
} from "react-hook-form";
import LoadingLogo from "../shared/components/LoadingLogo";

interface IInvoiceForm {
  form: UseFormReturn<CreateInvoice, any, undefined>;

  onSubmit: (values: CreateInvoice) => void;
  loading?: boolean;
  quotation?: boolean;
  edit?: boolean;
}
function getInputProps<T extends FieldValues>(
  register: UseFormRegister<T>,
  name: Path<T>
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onChange, ...rest } = register(name);
  return { ...rest };
}
const InvoiceForm = ({
  form,
  onSubmit,
  loading,
  quotation,
  edit,
}: IInvoiceForm) => {
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = form;
  const { data, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients(),
  });
  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
  return isLoadingProducts || isLoading ? (
    <div className="bg-white w-full h-dvh flex justify-center items-center top-0">
      <div className="w-20">
        <LoadingLogo />
      </div>
    </div>
  ) : (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <div className=" bg-white p-5 rounded-md shadow-lg">
            <p className="font-bold text-xl mb-2">
              {quotation ? "Quotation" : "Invoice"} Information
            </p>

            <TextInput
              label="Name"
              placeholder="Enter Name"
              withAsterisks
              {...register("name")}
              error={Boolean(errors["name"])}
              onKeyUp={() => trigger("name")}
              helperText={errors["name"]?.message as string}
              fullWidth
            />
          </div>

          <div className=" bg-white p-5 rounded-md shadow-lg mt-10">
            <div className="flex justify-between items-center">
              <p className="font-bold text-xl mb-2">Client Data</p>
              {edit || (
                <Menu
                  target={
                    <div className="flex items-center gap-1 bg-blue-900 text-white px-4 py-1 rounded-lg cursor-pointer">
                      <FaUsers />
                      <p className="">Contacts</p>
                    </div>
                  }
                  data={
                    data?.data.data?.results?.map((item) => {
                      return {
                        label: `${item.firstname} ${item.lastname}`,
                        onClick: () => {
                          setValue("client", item);
                          trigger("client");
                        },
                      };
                    }) || []
                  }
                />
              )}
            </div>
            <TextInput
              disabled={edit}
              withAsterisks
              {...register("client.firstname")}
              label="First Name"
              placeholder="Enter First Name"
              error={Boolean(errors.client?.firstname)}
              onKeyUp={() => trigger("client.firstname")}
              helperText={errors.client?.firstname?.message as string}
              fullWidth
            />
            <TextInput
              disabled={edit}
              withAsterisks
              {...register("client.lastname")}
              label="Last Name"
              placeholder="Enter Last Name"
              error={Boolean(errors.client?.lastname)}
              onKeyUp={() => trigger("client.lastname")}
              helperText={errors.client?.lastname?.message as string}
              fullWidth
            />
            <TextInput
              disabled={edit}
              withAsterisks
              {...register("client.phoneNumber")}
              label="Phone Number"
              placeholder="Enter Phone Number"
              error={Boolean(errors.client?.phoneNumber)}
              onKeyUp={() => trigger("client.phoneNumber")}
              helperText={errors.client?.phoneNumber?.message as string}
              fullWidth
            />
            <TextInput
              withAsterisks
              disabled={edit}
              {...register("client.email")}
              label="Email"
              placeholder="Enter Email"
              error={Boolean(errors.client?.email)}
              onKeyUp={() => trigger("client.email")}
              helperText={errors.client?.email?.message as string}
              fullWidth
            />
            <TextInput
              disabled={edit}
              textarea
              withAsterisks
              {...register("client.address")}
              label="Address"
              placeholder="Enter Address"
              error={Boolean(errors.client?.address)}
              onKeyUp={() => trigger("client.address")}
              helperText={errors.client?.address?.message as string}
              fullWidth
            />
          </div>
        </div>

        <div className=" bg-white p-5 rounded-md shadow-lg">
          <div className="flex justify-between items-center">
            <p className="font-bold text-xl mb-2">
              Items {quotation || "& Payment"}{" "}
            </p>
          </div>
          <SelectInput
            multiple
            value={form.getValues().products}
            label="Products"
            placeholder="Select Products"
            inputDivStyles="w-full"
            renderOption={(item) => (
              <span>
                {products?.data.data?.results.find((v) => v._id === item)?.name}
              </span>
            )}
            data={
              products?.data.data?.results?.map((item) => {
                return {
                  label: `${item.name}`,
                  value: item._id,
                };
              }) || []
            }
            error={Boolean(errors.products)}
            {...getInputProps<CreateInvoice>(register, "products")}
            onChange={(val) => setValue("products", val as string[])}
            onMouseUp={() => trigger("products")}
            helperText={errors.products?.message as string}
          />
          {!quotation && (
            <SelectInput
              value={form.getValues().paymentStatus}
              label="Payment Status"
              placeholder="Select Payment Method"
              inputDivStyles="w-full mt-4"
              renderOption={(val) =>
                Object.values(PaymentStatus)
                  .slice(0, Object.values(PaymentStatus).length - 1)
                  .map((stat) => {
                    return {
                      label: convertAllUpperCaseToSentenceCase(stat),
                      value: stat,
                    };
                  })
                  .find((value) => value.value === val)?.label
              }
              data={Object.values(PaymentStatus)
                .slice(0, Object.values(PaymentStatus).length - 1)
                .map((val) => {
                  return {
                    label: convertAllUpperCaseToSentenceCase(val),
                    value: val,
                  };
                })}
              {...getInputProps<CreateInvoice>(register, "paymentStatus")}
              onChange={(val) =>
                typeof val === "string" && setValue("paymentStatus", val)
              }
              onMouseUp={() => trigger("paymentStatus")}
              error={Boolean(errors.paymentStatus)}
              helperText={errors.paymentStatus?.message as string}
            />
          )}
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full mt-10 md:w-[500px]">
          <Button
            text="Submit"
            fullWidth
            onClick={handleSubmit(onSubmit)}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
