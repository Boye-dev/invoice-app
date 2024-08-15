import { zodResolver } from "@hookform/resolvers/zod";
import ProductForm from "../components/ProductForm";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { handleErrors } from "../utils/handleErrors";
import { useMutation } from "@tanstack/react-query";
import { CreateProduct } from "../interfaces/product.interface";
import * as z from "zod";
import { createProduct } from "../services/product.service";
import { useTitle } from "../hooks/useTitle";

const NewProduct = () => {
  useTitle("New Product | Invoice App");

  const schema = z.object({
    name: z.string().min(2, { message: "Name is required" }),
    price: z.string().min(2, { message: "Price is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    image: z.array(z.instanceof(File)),
  });
  const form = useForm<CreateProduct>({
    resolver: zodResolver(schema),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onError: (error) => {
      handleErrors(error);
    },
    onSuccess: (res) => {
      toast.success(res.message);
      form.reset();
    },
  });

  const submitSignUp = (values: CreateProduct) => {
    let data = new FormData();
    data.append("name", values.name);
    data.append("description", values.description);
    data.append("price", String(values.price));
    if (values.image && values.image?.length > 0) {
      data.append("image", values.image[0]);
    }
    mutate(data);
  };
  return (
    <div className="px-3 pb-10 pt-10 md:p-20">
      <p className="font-bold italic mb-2">
        Fill in all information to create a new product
      </p>
      <ProductForm form={form} loading={isPending} onSubmit={submitSignUp} />
    </div>
  );
};

export default NewProduct;
