import TextInput from "../shared/components/TextInput";
import Button from "../shared/components/Button";
import { UseFormReturn } from "react-hook-form";
import { CreateProduct } from "../interfaces/product.interface";
import FileUpload from "../shared/components/FileUpload";
interface IProductForm {
  form: UseFormReturn<CreateProduct, any, undefined>;
  onSubmit: (values: CreateProduct) => void;
  loading?: boolean;
}
const ProductForm = ({ form, onSubmit, loading }: IProductForm) => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = form;
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
        <div>
          <div className=" bg-white p-5 rounded-md shadow-lg mt-10">
            <div className="flex justify-between items-center">
              <p className="font-bold text-xl mb-2">Product Data</p>
            </div>
            <TextInput
              withAsterisks
              {...register("name")}
              label="Name"
              placeholder="Enter  Name"
              error={Boolean(errors["name"])}
              onKeyUp={() => trigger("name")}
              helperText={errors["name"]?.message as string}
              fullWidth
            />
            <TextInput
              withAsterisks
              {...register("price")}
              label="Price"
              placeholder="Enter Price"
              error={Boolean(errors["price"])}
              onKeyUp={() => trigger("price")}
              helperText={errors["price"]?.message as string}
              fullWidth
            />

            <TextInput
              textarea
              withAsterisks
              {...register("description")}
              label="Description"
              placeholder="Enter  Description"
              error={Boolean(errors["description"])}
              onKeyUp={() => trigger("description")}
              helperText={errors["description"]?.message as string}
              fullWidth
            />
            <FileUpload
              label="Upload  Picture"
              accept="image/*"
              {...register("image")}
              error={Boolean(errors["image"])}
              helperText={errors["image"]?.message as string}
              onChange={(files) => form.setValue("image", files)}
            />
          </div>
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

export default ProductForm;
