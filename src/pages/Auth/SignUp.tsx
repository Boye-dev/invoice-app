import TextInput from "../../shared/components/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import PasswordInput from "../../shared/components/PasswordInput";
import Button from "../../shared/components/Button";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "../../constants/routes";
import FileUpload from "../../shared/components/FileUpload";
import { useTitle } from "../../hooks/useTitle";
import { useMutation } from "@tanstack/react-query";
import { handleErrors } from "../../utils/handleErrors";
import { signup } from "../../services/user.service";
import { toast } from "react-toastify";
import { CreateUserRequest } from "../../interfaces/user.interface";
import { FaMailBulk } from "react-icons/fa";
import { useState } from "react";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Password should be greater than 6" }),
  firstname: z.string().min(2, { message: "Firstname is required" }),
  lastname: z.string().min(2, { message: "Lastname is required" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password should be greater than 6" }),
  profilePicture: z.array(z.instanceof(File)),
  businessLogo: z.array(z.instanceof(File)).min(1).max(1),
  businessName: z.string().min(1, { message: "Business Name is required" }),
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

const SignUp = () => {
  useTitle("Sign Up | Invoice App");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    setValue,
  } = useForm<CreateUserRequest>({
    resolver: zodResolver(schema),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onError: (error) => {
      handleErrors(error);
    },
    onSuccess: (res) => {
      setSubmitted(true);
      toast.success(res.message);
    },
  });
  const submitSignUp = (values: CreateUserRequest) => {
    let data = new FormData();
    data.append("firstname", values.firstname);
    data.append("lastname", values.lastname);
    data.append("email", values.email);
    data.append("phoneNumber", values.phoneNumber);
    data.append("businessName", values.businessName);
    data.append("businessAddress", values.businessAddress);
    data.append("businessCity", values.businessCity);
    data.append("businessState", values.businessState);
    data.append("businessZip", values.businessZip);
    data.append("businessCountry", values.businessCountry);
    data.append("businessPhone", values.businessPhone);
    data.append("businessEmail", values.businessEmail);
    data.append("password", values.password);

    if (values.businessWebsite)
      data.append("businessWebsite", values.businessWebsite);

    if (values.profilePicture)
      data.append("profilePicture", values.profilePicture[0]);

    if (values.businessLogo)
      data.append("businessLogo", values.businessLogo[0]);
    mutate(data);
  };
  const SuccessSignup = () => (
    <>
      <div className="flex flex-col justify-center w-full gap-10">
        <div className="flex justify-center">
          <FaMailBulk size={50} />
        </div>

        <p className="text-center">Link is on it&apos;s way</p>
        <p className="text-center">
          A comfirm email link has been sent to your email
        </p>
        <Button
          text="Login"
          size="md"
          onClick={() => navigate(AUTH_ROUTES.LOGIN)}
        />
      </div>
    </>
  );
  return submitted ? (
    <SuccessSignup />
  ) : (
    <>
      <p className="font-bold text-2xl text-center">Sign up</p>
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
      />
      <PasswordInput
        withAsterisks
        {...register("password")}
        label="Password"
        placeholder="Enter Password"
        error={Boolean(errors["password"])}
        onKeyUp={() => trigger("password")}
        helperText={errors["password"]?.message as string}
        fullWidth
      />
      <PasswordInput
        withAsterisks
        {...register("confirmPassword")}
        label="Confirm Password"
        placeholder="Enter Confirm Password"
        error={Boolean(errors["confirmPassword"])}
        onKeyUp={() => trigger("confirmPassword")}
        helperText={errors["confirmPassword"]?.message as string}
        fullWidth
      />
      <FileUpload
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
      <Button
        loading={isPending}
        text="Sign Up"
        fullWidth
        onClick={handleSubmit(submitSignUp)}
      />
      <p
        onClick={() => navigate(AUTH_ROUTES.LOGIN)}
        className="text-gray-400 text-sm cursor-pointer"
      >
        Already have an account? <span className="text-black">Login</span>
      </p>
    </>
  );
};

export default SignUp;
