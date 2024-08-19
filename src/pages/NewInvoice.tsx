import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { handleErrors } from "../utils/handleErrors";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as z from "zod";
import { createInvoice } from "../services/invoice.service";
import { useTitle } from "../hooks/useTitle";
import InvoiceForm from "../components/InvoiceForm";
import {
  CreateInvoice,
  InvoiceType,
  PaymentStatus,
} from "../interfaces/invoice.interface";
import { useState } from "react";
import Invoice from "../components/Invoice";
import { getDecodedJwt } from "../api/Auth";
import { getUserById } from "../services/user.service";
import LoadingLogo from "../shared/components/LoadingLogo";

const NewInvoice = () => {
  useTitle("New Invoice | Invoice App");
  const [preview, setPreview] = useState(false);
  const [completed, setCompleted] = useState(false);

  const schema = z.object({
    name: z.string().min(2, { message: "Name is required" }),
    products: z
      .array(
        z.object({
          productId: z.string().min(1, { message: "Enter product" }),
          quantity: z.string().min(1, { message: "Enter quantity" }),
        }),
        { message: "Please select a product" }
      )
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
  const id = getDecodedJwt()?.id || "";
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getUserById(id),
  });

  const form = useForm<CreateInvoice>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      products: [{ productId: "", quantity: "" }],
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
  const { mutate, isPending, data } = useMutation({
    mutationFn: createInvoice,
    onError: (error) => {
      handleErrors(error);
    },
    onSuccess: (res) => {
      setCompleted(true);

      toast.success(res.message);
    },
  });

  const submitSignUp = (values: CreateInvoice) => {
    mutate({ ...values, type: InvoiceType.INVOICE });
  };
  return (
    <div className="px-3 pb-10 pt-10 md:p-20">
      {completed ? (
        isProfileLoading ? (
          <div className="bg-white w-full h-dvh flex justify-center items-center top-0">
            <div className="w-20">
              <LoadingLogo />
            </div>
          </div>
        ) : (
          <>
            <Invoice
              form={form}
              profile={profile}
              invoiceNumber={data?.data?.invoiceNumber}
              download
            />
          </>
        )
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="font-bold italic mb-2">
              Fill in all information to create a new invoice
            </p>
            <div>
              <input
                type="checkbox"
                onChange={(e) => setPreview(e.target.checked)}
              />
              <label className="ml-2">Preview Mode</label>
            </div>
          </div>
          <InvoiceForm
            form={form}
            loading={isPending}
            onSubmit={submitSignUp}
            preview={preview}
            setPreview={setPreview}
          />
        </>
      )}
    </div>
  );
};

export default NewInvoice;
