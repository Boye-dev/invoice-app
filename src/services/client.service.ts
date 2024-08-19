import Api from "../api/Api";
import {
  CreateClient,
  IClient,
  IClientParams,
} from "../interfaces/client.interface";
import { ApiResponse } from "../interfaces/helper.interface";
import { handleErrors } from "../utils/handleErrors";
import { queryParamsHelper } from "../utils/query-params";
import { IGetAll } from "./invoice.service";

export const getClients = async (tableParams?: IClientParams) => {
  try {
    const res = await Api.get<ApiResponse<IGetAll<IClient>>>(
      `/clients${queryParamsHelper(tableParams)}`
    );
    if (res) {
      return res;
    }
  } catch (error) {
    if (error instanceof Error) return handleErrors(error);
  }
  return undefined;
};
export const getClientsInfinite = async (
  tableParams?: IClientParams
): Promise<ApiResponse<IGetAll<IClient>>> => {
  try {
    const res = await Api.get<ApiResponse<IGetAll<IClient>>>(
      `/clients${queryParamsHelper(tableParams)}`
    );

    if (res && res.data) {
      return res.data; // return only the data part
    }
  } catch (error) {
    if (error instanceof Error) {
      return handleErrors(error) as any; // adjust as needed depending on how handleErrors works
    }
  }

  throw new Error("Unexpected error occurred."); // throw error if no response or undefined returned
};
export const getClientById = async (id: string) => {
  try {
    const res = await Api.get<ApiResponse<IClient>>(`/clients/${id}`);
    if (res) {
      return res;
    }
  } catch (error) {
    if (error instanceof Error) return handleErrors(error);
  }
  return undefined;
};
export const createClient = async (payload: CreateClient) => {
  const res = await Api.post<ApiResponse<IClient>>("/clients/", payload);
  return res.data;
};

export const editClient = async (
  payload: Partial<CreateClient> & { id: string }
) => {
  const { id, ...data } = payload;
  const res = await Api.patch<ApiResponse<IClient>>(`/clients/${id}`, data);
  return res.data;
};
