import Api from "../api/Api";
import {
  CreateInvoice,
  IInvoice,
  IInvoiceParams,
} from "../interfaces/invoice.interface";
import { ApiResponse } from "../interfaces/helper.interface";
import { handleErrors } from "../utils/handleErrors";
import { queryParamsHelper } from "../utils/query-params";
export interface IGetAll<T> {
  results: T[];
  total: number;
  page: number;
  pageSize: number;
}
export const getInvoices = async (tableParams: IInvoiceParams) => {
  try {
    const res = await Api.get<ApiResponse<IGetAll<IInvoice>>>(
      `/invoices${queryParamsHelper(tableParams)}`
    );
    if (res) {
      return res;
    }
  } catch (error) {
    if (error instanceof Error) return handleErrors(error);
  }
  return undefined;
};
export const getInvoiceById = async (id: string) => {
  try {
    const res = await Api.get<ApiResponse<IInvoice>>(`/invoices/${id}`);
    if (res) {
      return res;
    }
  } catch (error) {
    if (error instanceof Error) return handleErrors(error);
  }
  return undefined;
};
export const createInvoice = async (payload: CreateInvoice) => {
  const res = await Api.post<ApiResponse<IInvoice>>("/invoices/", payload);
  return res.data;
};

export const sendEmail = async (formData: FormData) => {
  const res = await Api.post<ApiResponse<undefined>>(
    "/users/send-email",
    formData
  );
  return res.data;
};

export const editInvoice = async (
  payload: Partial<CreateInvoice> & { id: string }
) => {
  const { id, ...data } = payload;
  const res = await Api.patch<ApiResponse<IInvoice>>(`/invoices/${id}`, data);
  return res.data;
};
