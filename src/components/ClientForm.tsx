import TextInput from "../shared/components/TextInput";
import Button from "../shared/components/Button";
import { UseFormReturn } from "react-hook-form";
import { CreateClient } from "../interfaces/client.interface";
interface IClientForm {
  form: UseFormReturn<CreateClient, any, undefined>;
  onSubmit: (values: CreateClient) => void;
  loading?: boolean;
}
const ClientForm = ({ form, onSubmit, loading }: IClientForm) => {
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
              <p className="font-bold text-xl mb-2">Client Data</p>
            </div>
            <TextInput
              withAsterisks
              {...register("firstname")}
              label="First Name"
              placeholder="Enter First Name"
              error={Boolean(errors["firstname"])}
              onKeyUp={() => trigger("firstname")}
              helperText={errors["firstname"]?.message as string}
              fullWidth
            />
            <TextInput
              withAsterisks
              {...register("lastname")}
              label="Last Name"
              placeholder="Enter Last Name"
              error={Boolean(errors["lastname"])}
              onKeyUp={() => trigger("lastname")}
              helperText={errors["lastname"]?.message as string}
              fullWidth
            />
            <TextInput
              withAsterisks
              {...register("phoneNumber")}
              label="Phone Number"
              placeholder="Enter Phone Number"
              error={Boolean(errors["phoneNumber"])}
              onKeyUp={() => trigger("phoneNumber")}
              helperText={errors["phoneNumber"]?.message as string}
              fullWidth
            />
            <TextInput
              withAsterisks
              {...register("email")}
              label="Email"
              placeholder="Enter Email"
              error={Boolean(errors["email"])}
              onKeyUp={() => trigger("email")}
              helperText={errors["email"]?.message as string}
              fullWidth
            />{" "}
            <TextInput
              textarea
              withAsterisks
              {...register("address")}
              label=" Address"
              placeholder="Enter  Address"
              error={Boolean(errors["address"])}
              onKeyUp={() => trigger("address")}
              helperText={errors["address"]?.message as string}
              fullWidth
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

export default ClientForm;
