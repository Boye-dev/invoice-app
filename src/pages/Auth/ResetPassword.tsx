import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { FaMailBulk } from "react-icons/fa";
import Button from "../../shared/components/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword } from "../../services/user.service";
import { toast } from "react-toastify";
import { handleErrors } from "../../utils/handleErrors";
import PasswordInput from "../../shared/components/PasswordInput";
import { AUTH_ROUTES } from "../../constants/routes";
const schema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Password should be greater than 6" }),
    confirmNewPassword: z
      .string()
      .min(6, { message: "Password should be greater than 6" }),
  })
  .refine((val) => val.newPassword === val.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Password must be the same",
  });

const ResetPassword = () => {
  const [reset, setReset] = useState(false);
  const { id = "", token = "" } = useParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (res) => {
      setReset(true);
      toast.success(res.data.message);
    },
    onError: (error) => {
      handleErrors(error);
    },
  });
  const editPassword = (values: Record<string, any>) => {
    mutate({ password: values.newPassword, token, id });
  };

  const SuccessReset = () => (
    <>
      <div className="flex flex-col justify-center w-full gap-10">
        <div className="flex justify-center">
          <FaMailBulk size={50} />
        </div>

        <p className="text-center">You have successfully reset your password</p>
        <Button
          text="Login"
          size="md"
          onClick={() => navigate(AUTH_ROUTES.LOGIN)}
        />
      </div>
    </>
  );

  return (
    <>
      {reset ? (
        <SuccessReset />
      ) : (
        <>
          <PasswordInput
            withAsterisks
            {...register("newPassword")}
            label="New Password"
            placeholder="Enter Password"
            error={Boolean(errors["newPassword"])}
            onKeyUp={() => trigger("newPassword")}
            helperText={errors["newPassword"]?.message as string}
            fullWidth
          />
          <PasswordInput
            withAsterisks
            {...register("confirmNewPassword")}
            label="Confirm Password"
            placeholder="Enter Confirm Password"
            error={Boolean(errors["confirmNewPassword"])}
            onKeyUp={() => trigger("confirmNewPassword")}
            helperText={errors["confirmNewPassword"]?.message as string}
            fullWidth
          />
          <Button
            loading={isPending}
            text="Reset Password"
            fullWidth
            onClick={handleSubmit(editPassword)}
          />
        </>
      )}
    </>
  );
};

export default ResetPassword;
