import TextInput from "../../shared/components/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import PasswordInput from "../../shared/components/PasswordInput";
import Button from "../../shared/components/Button";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "../../constants/routes";
import FileUpload from "../../shared/components/FileUpload";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Password should be greater than 6" }),
  firstname: z.string().min(2, { message: "Firstname is required" }),
  lastname: z.string().min(2, { message: "Lastname is required" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password should be greater than 6" }),
});

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const login = () => {
    navigate(AUTH_ROUTES.LOGIN);
  };
  return (
    <>
      <p className="font-bold text-2xl text-center">Sign up</p>
      <TextInput
        {...register("firstname")}
        label="First Name"
        placeholder="Enter First Name"
        error={Boolean(errors["firstname"])}
        onKeyUp={() => trigger("firstname")}
        helperText={errors["firstname"]?.message as string}
        fullWidth
      />
      <TextInput
        {...register("lastname")}
        label="Last Name"
        placeholder="Enter Last Name"
        error={Boolean(errors["lastname"])}
        onKeyUp={() => trigger("lastname")}
        helperText={errors["lastname"]?.message as string}
        fullWidth
      />
      <TextInput
        {...register("email")}
        label="Email"
        placeholder="Enter Email"
        error={Boolean(errors["email"])}
        onKeyUp={() => trigger("email")}
        helperText={errors["email"]?.message as string}
        fullWidth
      />

      <PasswordInput
        {...register("password")}
        label="Password"
        placeholder="Enter Password"
        error={Boolean(errors["password"])}
        onKeyUp={() => trigger("password")}
        helperText={errors["password"]?.message as string}
        fullWidth
      />
      <PasswordInput
        {...register("confirmPassword")}
        label="Confirm Password"
        placeholder="Enter Confirm Password"
        error={Boolean(errors["confirmPassword"])}
        onKeyUp={() => trigger("confirmPassword")}
        helperText={errors["confirmPassword"]?.message as string}
        fullWidth
      />
      <FileUpload
        {...register("file")}
        onChange={(files) => setValue("file", files)}
      />

      <Button text="Sign Up" fullWidth onClick={handleSubmit(login)} />
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
