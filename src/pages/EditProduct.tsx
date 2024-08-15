import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateProduct } from "../interfaces/product.interface";
import * as z from "zod";
import { editProduct, getProductById } from "../services/product.service";
import { toast } from "react-toastify";
import { handleErrors } from "../utils/handleErrors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ProductForm from "../components/ProductForm";
import { useParams } from "react-router-dom";
import LoadingLogo from "../shared/components/LoadingLogo";
import { useEffect } from "react";
import { useTitle } from "../hooks/useTitle";

const EditProduct = () => {
  useTitle("Edit Product | Invoice App");

  const { id = "" } = useParams();
  const schema = z.object({
    name: z.string().min(2, { message: "Name is required" }),
    price: z.string().min(2, { message: "Price is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    image: z.array(z.instanceof(File)),
  });
  const form = useForm<CreateProduct>({
    resolver: zodResolver(schema),
  });
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id || ""),
    enabled: Boolean(id),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: editProduct,
    onError: (error) => {
      handleErrors(error);
    },
    onSuccess: (res) => {
      toast.success(res.message);
    },
  });
  useEffect(() => {
    if (isSuccess) {
      if (data?.data.data) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { image, ...payload } = data.data.data;
        form.reset({ ...payload, image: [], price: String(payload.price) });
      }
    }
  }, [isSuccess, data?.data.data, form]);
  const submitSignUp = (values: CreateProduct) => {
    const formData = new FormData();
    if (data?.data && values.name !== data.data.data?.name) {
      formData.append("name", values.name);
    }
    formData.append("description", values.description);
    formData.append("price", String(values.price));
    if (values.image && values.image?.length > 0) {
      formData.append("image", values.image[0]);
    }
    mutate({ data: formData, id });
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
        Fill in all information to edit this product
      </p>
      <ProductForm form={form} loading={isPending} onSubmit={submitSignUp} />
    </div>
  );
};

export default EditProduct;
