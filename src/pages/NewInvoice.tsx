import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { handleErrors } from "../utils/handleErrors";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import { createInvoice } from "../services/invoice.service";
import { useTitle } from "../hooks/useTitle";
import InvoiceForm from "../components/InvoiceForm";
import {
  CreateInvoice,
  InvoiceType,
  PaymentStatus,
} from "../interfaces/invoice.interface";

const NewInvoice = () => {
  useTitle("New Invoice | Invoice App");

  const schema = z.object({
    name: z.string().min(2, { message: "Name is required" }),
    products: z
      .array(z.string(), { message: "Please select a product" })
      .min(1, { message: "Please select a product" }),
    paymentStatus: z.enum(
      [...Object.values(PaymentStatus)] as [PaymentStatus, ...PaymentStatus[]],
      { message: "Please select status" }
    ),
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
      paymentStatus: "",
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
    mutationFn: createInvoice,
    onError: (error) => {
      handleErrors(error);
    },
    onSuccess: (res) => {
      form.reset({
        name: "",
        products: [],
        paymentStatus: undefined,
        client: {
          email: "",
          firstname: "",
          lastname: "",
          address: "",
          phoneNumber: "",
        },
      });
      toast.success(res.message);
    },
  });

  const submitSignUp = (values: CreateInvoice) => {
    mutate({ ...values, type: InvoiceType.INVOICE });
  };
  return (
    <div className="px-3 pb-10 pt-10 md:p-20">
      <p className="font-bold italic mb-2">
        Fill in all information to create a new invoice
      </p>
      <InvoiceForm form={form} loading={isPending} onSubmit={submitSignUp} />
    </div>
  );
};

export default NewInvoice;
