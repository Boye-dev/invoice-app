import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateClient } from "../interfaces/client.interface";
import * as z from "zod";
import { editClient, getClientById } from "../services/client.service";
import { toast } from "react-toastify";
import { handleErrors } from "../utils/handleErrors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ClientForm from "../components/ClientForm";
import { useParams } from "react-router-dom";
import LoadingLogo from "../shared/components/LoadingLogo";
import { useEffect } from "react";
import { useTitle } from "../hooks/useTitle";
const EditProduct = () => {
  useTitle("Edit client | Invoice App");

  const { id = "" } = useParams();
  const schema = z.object({
    email: z.string().email(),
    firstname: z.string().min(2, { message: "Firstname is required" }),
    lastname: z.string().min(2, { message: "Lastname is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    phoneNumber: z.string().min(10, { message: "Phone is required" }),
  });
  const form = useForm<CreateClient>({
    resolver: zodResolver(schema),
  });
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["client", id],
    queryFn: () => getClientById(id || ""),
    enabled: Boolean(id),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: editClient,
    onError: (error) => {
      handleErrors(error);
    },
    onSuccess: (res) => {
      toast.success(res.message);
    },
  });
  useEffect(() => {
    if (isSuccess) {
      form.reset(data?.data.data);
    }
  }, [isSuccess, data?.data.data, form]);
  const submitSignUp = (values: CreateClient) => {
    mutate({ ...values, id });
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
        Fill in all information to edit this client
      </p>
      <ClientForm form={form} loading={isPending} onSubmit={submitSignUp} />
    </div>
  );
};

export default EditProduct;
