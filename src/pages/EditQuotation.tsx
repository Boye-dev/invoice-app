import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { handleErrors } from "../utils/handleErrors";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as z from "zod";
import { editInvoice, getInvoiceById } from "../services/invoice.service";
import { useTitle } from "../hooks/useTitle";
import InvoiceForm from "../components/InvoiceForm";
import { CreateInvoice, InvoiceType } from "../interfaces/invoice.interface";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingLogo from "../shared/components/LoadingLogo";

const EditQuotation = () => {
  useTitle("Edit Invoice | Invoice App");

  const { id = "" } = useParams();
  const schema = z.object({
    name: z.string().min(2, { message: "Name is required" }),
    products: z
      .array(z.string(), { message: "Please select a product" })
      .min(1, { message: "Please select a product" }),
    client: z.object({
      email: z.string().email(),
      firstname: z.string().min(2, { message: "Firstname is required" }),
      lastname: z.string().min(2, { message: "Lastname is required" }),
      address: z.string().min(1, { message: "Address is required" }),
      phoneNumber: z.string().min(10, { message: "Phone is required" }),
      _id: z.string().optional(),
    }),
  });
  const form = useForm<CreateInvoice>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      products: [],
      client: {
        email: "",
        firstname: "",
        lastname: "",
        address: "",
        phoneNumber: "",
      },
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: editInvoice,
    onError: (error) => {
      handleErrors(error);
    },
    onSuccess: (res) => {
      toast.success(res.message);
    },
  });
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getInvoiceById(id || ""),
    enabled: Boolean(id),
  });
  useEffect(() => {
    if (isSuccess) {
      if (data?.data.data) {
        const { products, ...payload } = data.data.data;
        const productsData = products as string[];
        form.reset({ ...payload, products: productsData });
      }
    }
  }, [isSuccess, data?.data.data, form]);
  const submitSignUp = (values: CreateInvoice) => {
    mutate({ ...values, type: InvoiceType.QUOTATION, id });
  };
  return isLoading ? (
    <div className="w-full h-dvh flex justify-center items-center">
      <div className="w-20">
        <LoadingLogo />
      </div>
    </div>
  ) : (
    <div className="px-3 pb-10 pt-10 md:p-20">
      <p className="font-bold italic mb-2">
        Fill in all information to edit this quotation
      </p>
      <InvoiceForm
        form={form}
        loading={isPending}
        onSubmit={submitSignUp}
        edit
        quotation
      />
    </div>
  );
};

export default EditQuotation;
