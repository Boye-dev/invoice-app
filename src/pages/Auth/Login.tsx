import TextInput from "../../shared/components/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import PasswordInput from "../../shared/components/PasswordInput";
import Button from "../../shared/components/Button";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "../../constants/routes";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Password should be greater than 6" }),
});

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const login = () => {
    navigate(AUTH_ROUTES.LOGIN);
  };
  return (
    <>
      <p className="font-bold text-2xl text-center">Login</p>

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
      <div className="w-full">
        <p
          className="text-xs text-blue-900 text-right underline cursor-pointer"
          onClick={() => navigate(AUTH_ROUTES.FORGOT_PASSWORD)}
        >
          Forgot Password?
        </p>
      </div>
      <Button text="Login" fullWidth onClick={handleSubmit(login)} />
      <p
        className="text-gray-400 text-sm cursor-pointer"
        onClick={() => navigate(AUTH_ROUTES.SIGN_UP)}
      >
        Don't have an account? <span className="text-black">Sign up</span>
      </p>
    </>
  );
};

export default Login;
