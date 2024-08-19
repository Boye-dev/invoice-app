import TextInput from "../shared/components/TextInput";
import Button from "../shared/components/Button";
import SelectInput from "../shared/components/SelectInput";
import { getProducts } from "../services/product.service";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getClientsInfinite } from "../services/client.service";
import Menu from "../shared/components/Menu";
import { FaPlus, FaTrash, FaUsers } from "react-icons/fa";
import { CreateInvoice, PaymentStatus } from "../interfaces/invoice.interface";
import { convertAllUpperCaseToSentenceCase } from "../utils/textHelpers";
import {
  FieldValues,
  Path,
  useFieldArray,
  UseFormRegister,
  UseFormReturn,
} from "react-hook-form";
import LoadingLogo from "../shared/components/LoadingLogo";
import Invoice from "./Invoice";
import { getDecodedJwt } from "../api/Auth";
import { getUserById } from "../services/user.service";
import { IProductParams } from "../interfaces/product.interface";
import useFilter from "../hooks/useFilter";
import { IClient, IClientParams } from "../interfaces/client.interface";
import { ApiResponse } from "../interfaces/helper.interface";
import { IGetAll } from "../services/invoice.service";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export interface IInvoiceForm {
  form: UseFormReturn<CreateInvoice, any, undefined>;

  onSubmit: (values: CreateInvoice) => void;
  loading?: boolean;
  quotation?: boolean;
  edit?: boolean;
  preview?: boolean;
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
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
  preview,
  edit,
}: IInvoiceForm) => {
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
    control,
  } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  const { params: tableParamsClient } = useFilter<IClientParams>({
    defaultParams: {
      page: 0,
      pageSize: 10,
    },
  });
  const { ref, inView } = useInView();

  const { fetchNextPage, hasNextPage, data } = useInfiniteQuery({
    queryKey: ["clients-infinte", tableParamsClient],

    queryFn: ({ pageParam = 0 }) =>
      getClientsInfinite({ ...tableParamsClient, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (
      lastPage: ApiResponse<IGetAll<IClient>>,
      pages: ApiResponse<IGetAll<IClient>>[]
    ) => {
      const totalItems = lastPage?.data?.total || 0;
      const itemsLoaded = pages.reduce(
        (total: number, page: ApiResponse<IGetAll<IClient>>) =>
          total + (page.data?.results.length || 0),
        0
      );

      if (itemsLoaded < totalItems) {
        return pages.length;
      }

      return undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const { params: tableParamsProducts, setSearch } = useFilter<IProductParams>({
    defaultParams: {
      page: 0,
      pageSize: 10,
    },
  });
  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products", tableParamsProducts],
    queryFn: () => getProducts(tableParamsProducts),
  });
  const id = getDecodedJwt()?.id || "";
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getUserById(id),
  });
  return isProfileLoading ? (
    <div className="bg-white w-full h-dvh flex justify-center items-center top-0">
      <div className="w-20">
        <LoadingLogo />
      </div>
    </div>
  ) : preview ? (
    <Invoice
      form={form}
      profile={profile}
      invoiceNumber={form.getValues()?.invoiceNumber}
    />
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
                    data?.pages
                      .flatMap((page) => page.data?.results)
                      .map((item, i) => {
                        return {
                          label: `${item?.firstname} ${item?.lastname}`,
                          onClick: () => {
                            item && setValue("client", item);
                            trigger("client");
                          },
                          ...(data?.pages.flatMap((page) => page.data?.results)
                            .length ===
                            i + 1 && {
                            render: () => (
                              <p
                                className="ml-2"
                                ref={ref}
                              >{`${item?.firstname} ${item?.lastname}`}</p>
                            ),
                          }),
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
          {fields.map((item, index) => (
            <div key={item.id}>
              <SelectInput
                value={form.getValues().products[index].productId}
                label="Products"
                loading={isLoadingProducts}
                searchable
                serverSearch
                handleSearch={(search) => setSearch(search)}
                placeholder="Select Products"
                inputDivStyles="w-full"
                renderOption={(item) => (
                  <span>
                    {
                      products?.data.data?.results.find((v) => v._id === item)
                        ?.name
                    }
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
                error={Boolean(errors?.products?.[index]?.productId)}
                helperText={errors?.products?.[index]?.productId?.message}
                {...getInputProps<CreateInvoice>(
                  register,
                  `products.${index}.productId`
                )}
                onChange={(val) => {
                  if (!val) {
                    setValue(`products.${index}.productId`, "");
                  } else {
                    typeof val === "string" &&
                      setValue(`products.${index}.productId`, val);
                  }

                  const productsData = [...form.getValues().products];
                  const newProductsData = productsData.map((item) => {
                    const isProduct = products?.data.data?.results.find(
                      (value) => value._id === item.productId
                    );

                    if (isProduct) {
                      return {
                        ...item,
                        productId: isProduct,
                      };
                    }
                    return { ...item, productId: null };
                  });

                  setValue("productsData", newProductsData);
                }}
                onMouseUp={() => trigger(`products.${index}.productId`)}
              />
              <TextInput
                number
                label="Quantity"
                placeholder="Enter quantity"
                {...register(`products.${index}.quantity`)}
                error={Boolean(errors?.products?.[index]?.quantity)}
                helperText={errors?.products?.[index]?.quantity?.message}
                fullWidth
                onChange={(e) => {
                  const productsData = form.getValues().productsData || [];
                  productsData[index].quantity = e.target.value;
                  setValue("productsData", productsData);
                }}
              />
              <FaTrash
                className="text-red-700 my-5 cursor-pointer"
                onClick={() => {
                  remove(index);
                  const productsData = [...form.getValues().products];
                  const newProductsData = productsData.map((item) => {
                    const isProduct = products?.data.data?.results.find(
                      (value) => value._id === item.productId
                    );

                    if (isProduct) {
                      return {
                        ...item,
                        productId: isProduct,
                      };
                    }
                    return { ...item, productId: null };
                  });

                  setValue("productsData", newProductsData);
                }}
              />
            </div>
          ))}
          <FaPlus
            onClick={() => {
              append({ productId: "", quantity: "" });
              const productsData = [...form.getValues().products];
              const newProductsData = productsData.map((item) => {
                const isProduct = products?.data.data?.results.find(
                  (value) => value._id === item.productId
                );

                if (isProduct) {
                  return {
                    ...item,
                    productId: isProduct,
                  };
                }
                return { ...item, productId: null };
              });

              setValue("productsData", newProductsData);
            }}
            className="cursor-pointer"
          />
          {Boolean(errors?.products?.root) && (
            <p className="text-red-700 text-xs">
              {errors?.products?.root?.message}
            </p>
          )}

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
