import TextInput from "../../shared/components/TextInput";
import Button from "../../shared/components/Button";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AUTH_ROUTES } from "../../constants/routes";

const schema = z.object({
  email: z.string().email(),
});
const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const forgotPassword = () => {
    navigate(AUTH_ROUTES.LOGIN);
  };
  return (
    <>
      <p className="font-bold text-2xl text-center">Forgot Password</p>
      <TextInput
        {...register("email")}
        label="Email"
        placeholder="Enter Email"
        error={Boolean(errors["email"])}
        onKeyUp={() => trigger("email")}
        helperText={errors["email"]?.message as string}
        fullWidth
      />
      <Button
        text="Forgot Password"
        fullWidth
        onClick={handleSubmit(forgotPassword)}
      />
    </>
  );
};

export default ForgotPassword;
