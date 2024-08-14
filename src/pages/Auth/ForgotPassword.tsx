import TextInput from "../../shared/components/TextInput";
import Button from "../../shared/components/Button";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { handleErrors } from "../../utils/handleErrors";
import { toast } from "react-toastify";
import { forgotPassword } from "../../services/user.service";
import { FaMailBulk } from "react-icons/fa";
import { AUTH_ROUTES } from "../../constants/routes";
import { useTitle } from "../../hooks/useTitle";
import { useState } from "react";
const schema = z.object({
  email: z.string().email(),
});
const ForgotPassword = () => {
  useTitle("Forgot Password| Invoice App");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: zodResolver(schema),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (res) => {
      setSubmitted(true);
      toast.success(res.data.message);
    },
    onError: (error) => {
      handleErrors(error);
    },
  });
  const forgotPasswordSubmit = (values: { email: string }) => {
    mutate({ email: values.email });
  };
  const SuccessSignup = () => (
    <>
      <div className="flex flex-col justify-center w-full gap-10">
        <div className="flex justify-center">
          <FaMailBulk size={50} />
        </div>

        <p className="text-center">Link is on it&apos;s way</p>
        <p className="text-center">
          A reset password email link has been sent to your email
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
        loading={isPending}
        text="Forgot Password"
        fullWidth
        onClick={handleSubmit(forgotPasswordSubmit)}
      />
    </>
  );
};

export default ForgotPassword;
