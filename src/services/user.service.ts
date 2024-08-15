import Api from "../api/Api";
import { ApiResponse } from "../interfaces/helper.interface";
import {
  IPasswordReset,
  IUser,
  IUserLogin,
} from "../interfaces/user.interface";
import { handleErrors } from "../utils/handleErrors";

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}
export const forgotPassword = ({ email }: { email: string }) =>
  Api.post(
    "/users/forgot-password",
    { email },
    {
      headers: {
        noBearerToken: true,
      },
    }
  );
export const login = async (payload: IUserLogin) => {
  const res = await Api.post<ApiResponse<ILoginResponse>>(
    "/users/login",
    payload,
    {
      headers: {
        noBearerToken: true,
      },
    }
  );
  return res.data;
};

export const signup = async (payload: FormData) => {
  const res = await Api.post<ApiResponse<IUser>>("/users/", payload, {
    headers: {
      noBearerToken: true,
    },
  });
  return res.data;
};

export const updateUser = async ({
  payload,
  id,
}: {
  payload: FormData;
  id: string;
}) => {
  const res = await Api.patch<ApiResponse<ILoginResponse>>(
    `/users/${id}`,
    payload
  );
  return res.data;
};
export const updatePassword = async ({
  payload,
  id,
}: {
  payload: IPasswordReset;
  id: string;
}) => {
  const res = await Api.patch<ApiResponse<IUser>>(
    `/users/update-password/${id}`,
    payload
  );
  return res.data;
};

export const resetPassword = ({
  password,
  token,
  id,
}: {
  password: string;
  token: string;
  id: string;
}) =>
  Api.patch(
    `/users/reset-password/${id}/${token}`,
    { password },
    {
      headers: {
        noBearerToken: true,
      },
    }
  );

export const verifyUser = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  try {
    const res = await Api.get(`/users/verify/${id}/${token}`, {
      headers: {
        noBearerToken: true,
      },
    });
    if (res) {
      return res.data;
    }
  } catch (error) {
    if (error instanceof Error) return handleErrors(error);
  }
  return undefined;
};

export const getUserById = async (id: string) => {
  try {
    const res = await Api.get<ApiResponse<IUser>>(`/users/${id}`);
    if (res) {
      return res.data;
    }
  } catch (error) {
    if (error instanceof Error) return handleErrors(error);
  }
  return undefined;
};
