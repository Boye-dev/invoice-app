import TextInput from "../../shared/components/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import PasswordInput from "../../shared/components/PasswordInput";
import Button from "../../shared/components/Button";
import { Navigate, useNavigate } from "react-router-dom";
import { AUTH_ROUTES, DASHBOARD_PATHS } from "../../constants/routes";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/user.service";
import { IUserLogin } from "../../interfaces/user.interface";
import { handleErrors } from "../../utils/handleErrors";
import { setAllToken } from "../../api/Auth";
import { toast } from "react-toastify";
import useRoleAuthentication from "../../hooks/useRoleAuthentication";
import LoadingLogo from "../../shared/components/LoadingLogo";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Password should be greater than 6" }),
});

const Login = () => {
  const navigate = useNavigate();
  const { loading, authenticated } = useRoleAuthentication();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<IUserLogin>({
    resolver: zodResolver(schema),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onError: (error) => {
      handleErrors(error);
    },
    onSuccess: (res) => {
      if (res.data) setAllToken(res.data?.accessToken, res.data?.refreshToken);
      toast.success(res.message);
      navigate(DASHBOARD_PATHS.INVOICES);
    },
  });
  const submitLogin = (values: IUserLogin) => {
    mutate({ ...values });
  };

  return loading ? (
    <div className="fixed bg-white w-full h-dvh flex justify-center items-center top-0">
      <div className="w-20">
        <LoadingLogo />
      </div>
    </div>
  ) : authenticated ? (
    <Navigate to={DASHBOARD_PATHS.INVOICES} />
  ) : (
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
      <Button
        loading={isPending}
        text="Login"
        fullWidth
        onClick={handleSubmit(submitLogin)}
      />
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
