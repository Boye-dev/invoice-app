import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const handleErrors = (error: Error) => {
  if (error instanceof AxiosError) {
    if (error.response?.data.fields) {
      error.response.data.fields.forEach(
        (field: { message: string; path: string }) => toast.error(field.message)
      );
    } else {
      toast.error(error.response?.data.message);
    }
    throw new Error(error.response?.data.message);
  }
  toast.error(error.message);

  throw new Error(error.message);
};
