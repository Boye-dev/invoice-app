import { zodResolver } from "@hookform/resolvers/zod";
import ClientForm from "../components/ClientForm";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { handleErrors } from "../utils/handleErrors";
import { useMutation } from "@tanstack/react-query";
import { CreateClient } from "../interfaces/client.interface";
import * as z from "zod";
import { createClient } from "../services/client.service";
import { useTitle } from "../hooks/useTitle";

const NewClient = () => {
  useTitle("New Client | Invoice App");

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
  const { mutate, isPending } = useMutation({
    mutationFn: createClient,
    onError: (error) => {
      handleErrors(error);
    },
    onSuccess: (res) => {
      toast.success(res.message);
      form.reset();
    },
  });

  const submitSignUp = (values: CreateClient) => {
    mutate(values);
  };
  return (
    <div className="px-3 pb-10 pt-10 md:p-20">
      <p className="font-bold italic mb-2">
        Fill in all information to create a new client
      </p>
      <ClientForm form={form} loading={isPending} onSubmit={submitSignUp} />
    </div>
  );
};

export default NewClient;
