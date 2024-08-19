import TextInput from "../shared/components/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import PasswordInput from "../shared/components/PasswordInput";
import Button from "../shared/components/Button";
import FileUpload from "../shared/components/FileUpload";
import {
  CreateUserRequest,
  IPasswordReset,
  IUser,
} from "../interfaces/user.interface";
import { useEffect } from "react";
import LoadingLogo from "../shared/components/LoadingLogo";
import { handleErrors } from "../utils/handleErrors";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updatePassword, updateUser } from "../services/user.service";
import { ApiResponse } from "../interfaces/helper.interface";
import { setAllToken } from "../api/Auth";
import { useUserContext } from "../contexts/UserContext";

const schema = z.object({
  firstname: z.string().min(2, { message: "Firstname is required" }),
  lastname: z.string().min(2, { message: "Lastname is required" }),
  phoneNumber: z.string().min(2, { message: "Phone Number is required" }),
  profilePicture: z.array(z.instanceof(File)),
  businessLogo: z.array(z.instanceof(File)),
  businessName: z.string().min(1, { message: "Business Name is required" }),
  businessCurrency: z
    .string()
    .min(1, { message: "Business Currency is required" }),
  businessAddress: z
    .string()
    .min(1, { message: "Business Address is required" }),
  businessCity: z.string().min(1, { message: "Business City is required" }),
  businessState: z.string().min(1, { message: "Business State is required" }),
  businessZip: z.string().min(1, { message: "Business Zip is required" }),
  businessCountry: z
    .string()
    .min(1, { message: "Business Country is required" }),
  businessPhone: z.string().min(10, { message: "Business Phone is required" }),
  businessEmail: z.string().email({ message: "Invalid email address" }),
  businessWebsite: z.string(),
});

const passwordSchema = z.object({
  oldPassword: z
    .string()
    .min(6, { message: "Password should be greater than 6" }),
  newPassword: z
    .string()
    .min(6, { message: "Password should be greater than 6" }),
  confirmNewPassword: z
    .string()
    .min(6, { message: "Password should be greater than 6" }),
});

const ProfileForm = ({
  data,
  loading,
  refetch,
}: {
  data?: IUser;
  loading: boolean;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ApiResponse<IUser> | undefined, Error>>;
}) => {
  const { refresh, setRefresh } = useUserContext();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Partial<Omit<CreateUserRequest, "password" | "email">>>({
    resolver: zodResolver(schema),
  });

  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    trigger: passwordTrigger,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<IPasswordReset>({
    resolver: zodResolver(passwordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      handleErrors(error);
    },
    onSuccess: (res) => {
      if (res.data) {
        setAllToken(res.data?.accessToken, res.data?.refreshToken);
        refetch();
        setRefresh(!refresh);
        toast.success(res.message);
      }
    },
  });
  const { mutate: passwordMutate, isPending: isPasswordPending } = useMutation({
    mutationFn: updatePassword,
    onError: (error) => {
      handleErrors(error);
    },
    onSuccess: (res) => {
      resetPassword({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      toast.success(res.message);
    },
  });
  useEffect(() => {
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { profilePicture, businessLogo, ...rest } = data;
      reset({ ...rest, profilePicture: [], businessLogo: [] });
    }
  }, [data, reset]);
  const submitSignUp = (
    values: Partial<Omit<CreateUserRequest, "password" | "email">>
  ) => {
    if (values) {
      const formData = new FormData();
      formData.append("firstname", values?.firstname || "");
      formData.append("lastname", values?.lastname || "");
      formData.append("phoneNumber", values.phoneNumber || "");
      formData.append("businessName", values.businessName || "");
      formData.append("businessAddress", values.businessAddress || "");
      formData.append("businessCity", values.businessCity || "");
      formData.append("businessState", values.businessState || "");
      formData.append("businessZip", values.businessZip || "");
      formData.append("businessCountry", values.businessCountry || "");
      formData.append("businessPhone", values.businessPhone || "");
      formData.append("businessEmail", values.businessEmail || "");
      formData.append("businessCurrency", values.businessCurrency || "");

      if (values.businessWebsite)
        formData.append("businessWebsite", values.businessWebsite);

      if (values.profilePicture && values.profilePicture?.length > 0)
        formData.append("profilePicture", values.profilePicture[0]);

      if (values.businessLogo && values.businessLogo.length > 0)
        formData.append("businessLogo", values.businessLogo[0]);

      mutate({ payload: formData, id: data?._id || "" });
    }
  };
  return loading ? (
    <div className="w-full h-dvh flex justify-center items-center">
      <div className="w-20">
        <LoadingLogo />
      </div>
    </div>
  ) : (
    <>
      <div className="flex flex-col gap-4">
        <p className="font-bold text-2xl text-center">Profile</p>
        <p className="text-left w-full">Profile Details</p>
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
          value={data?.email}
          name="email"
          disabled
          withAsterisks
          label="Email"
          placeholder="Enter Last Name"
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

        <FileUpload
          target={
            <div className="w-20 h-20 rounded-full">
              <img
                className="w-20 h-20 rounded-full"
                src={data?.profilePicture}
              />
            </div>
          }
          label="Upload Profile Picture"
          accept="image/*"
          {...register("profilePicture")}
          onChange={(files) => setValue("profilePicture", files)}
        />
        <p className="text-left w-full">Business Details</p>
        <TextInput
          withAsterisks
          {...register("businessName")}
          label="Business Name"
          placeholder="Enter Business Name"
          error={Boolean(errors["businessName"])}
          onKeyUp={() => trigger("businessName")}
          helperText={errors["businessName"]?.message as string}
          fullWidth
        />

        <TextInput
          withAsterisks
          {...register("businessCity")}
          label="Business City"
          placeholder="Enter Business City"
          error={Boolean(errors["businessCity"])}
          onKeyUp={() => trigger("businessCity")}
          helperText={errors["businessCity"]?.message as string}
          fullWidth
        />

        <TextInput
          withAsterisks
          {...register("businessState")}
          label="Business State"
          placeholder="Enter Business State"
          error={Boolean(errors["businessState"])}
          onKeyUp={() => trigger("businessState")}
          helperText={errors["businessState"]?.message as string}
          fullWidth
        />

        <TextInput
          withAsterisks
          {...register("businessZip")}
          label="Business Zip"
          placeholder="Enter Business Zip"
          error={Boolean(errors["businessZip"])}
          onKeyUp={() => trigger("businessZip")}
          helperText={errors["businessZip"]?.message as string}
          fullWidth
        />

        <TextInput
          withAsterisks
          {...register("businessCountry")}
          label="Business Country"
          placeholder="Enter Business Country"
          error={Boolean(errors["businessCountry"])}
          onKeyUp={() => trigger("businessCountry")}
          helperText={errors["businessCountry"]?.message as string}
          fullWidth
        />
        <TextInput
          withAsterisks
          {...register("businessCurrency")}
          label="Business Currency"
          placeholder="Enter Business Currency"
          error={Boolean(errors["businessCurrency"])}
          onKeyUp={() => trigger("businessCurrency")}
          helperText={errors["businessCurrency"]?.message as string}
          fullWidth
        />
        <TextInput
          withAsterisks
          {...register("businessPhone")}
          label="Business Phone"
          placeholder="Enter Business Phone"
          error={Boolean(errors["businessPhone"])}
          onKeyUp={() => trigger("businessPhone")}
          helperText={errors["businessPhone"]?.message as string}
          fullWidth
        />

        <TextInput
          withAsterisks
          {...register("businessEmail")}
          label="Business Email"
          placeholder="Enter Business Email"
          error={Boolean(errors["businessEmail"])}
          onKeyUp={() => trigger("businessEmail")}
          helperText={errors["businessEmail"]?.message as string}
          fullWidth
        />

        <TextInput
          {...register("businessWebsite")}
          label="Business Website"
          placeholder="Enter Business Website"
          error={Boolean(errors["businessWebsite"])}
          onKeyUp={() => trigger("businessWebsite")}
          helperText={errors["businessWebsite"]?.message as string}
          fullWidth
        />
        <TextInput
          textarea
          withAsterisks
          {...register("businessAddress")}
          label="Business Address"
          placeholder="Enter Business Address"
          error={Boolean(errors["businessAddress"])}
          onKeyUp={() => trigger("businessAddress")}
          helperText={errors["businessAddress"]?.message as string}
          fullWidth
        />

        <FileUpload
          target={
            <div className="w-20 h-20 rounded-full">
              <img
                src={data?.businessLogo}
                className="w-20 h-20 rounded-full"
              />
            </div>
          }
          withAsterisks
          label="Upload Business Logo"
          accept="image/*"
          {...register("businessLogo")}
          onChange={(files) => {
            setValue("businessLogo", files);
            trigger("businessLogo");
          }}
          error={Boolean(errors["businessLogo"])}
          helperText={errors["businessLogo"]?.message as string}
        />
      </div>
      <Button
        text="Update"
        loading={isPending || isPasswordPending}
        buttonStyles="my-10"
        fullWidth
        onClick={handleSubmit(submitSignUp)}
      />
      <div className="flex flex-col gap-4">
        <PasswordInput
          {...passwordRegister("oldPassword")}
          label="Old Password"
          placeholder="Enter Old Password"
          error={Boolean(passwordErrors["oldPassword"])}
          onKeyUp={() => passwordTrigger("oldPassword")}
          helperText={passwordErrors["oldPassword"]?.message as string}
          fullWidth
        />
        <PasswordInput
          {...passwordRegister("newPassword")}
          label="New Password"
          placeholder="Enter New Password"
          error={Boolean(passwordErrors["newPassword"])}
          onKeyUp={() => passwordTrigger("newPassword")}
          helperText={passwordErrors["newPassword"]?.message as string}
          fullWidth
        />
        <PasswordInput
          {...passwordRegister("confirmNewPassword")}
          label="Confirm Password"
          placeholder="Enter Confirm Password"
          error={Boolean(passwordErrors["confirmNewPassword"])}
          onKeyUp={() => passwordTrigger("confirmNewPassword")}
          helperText={passwordErrors["confirmNewPassword"]?.message as string}
          fullWidth
        />
      </div>
      <Button
        text="Update Password"
        loading={isPending || isPasswordPending}
        buttonStyles="my-10"
        fullWidth
        onClick={handlePasswordSubmit((values) =>
          passwordMutate({ payload: values, id: data?._id || "" })
        )}
      />
    </>
  );
};

export default ProfileForm;
