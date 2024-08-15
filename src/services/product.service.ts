import Api from "../api/Api";
import { IProduct, IProductParams } from "../interfaces/product.interface";
import { ApiResponse } from "../interfaces/helper.interface";
import { handleErrors } from "../utils/handleErrors";
import { queryParamsHelper } from "../utils/query-params";
import { IGetAll } from "./invoice.service";

export const getProducts = async (tableParams?: IProductParams) => {
  try {
    const res = await Api.get<ApiResponse<IGetAll<IProduct>>>(
      `/products${queryParamsHelper(tableParams)}`
    );
    if (res) {
      return res;
    }
  } catch (error) {
    if (error instanceof Error) return handleErrors(error);
  }
  return undefined;
};
export const getProductById = async (id: string) => {
  try {
    const res = await Api.get<ApiResponse<IProduct>>(`/products/${id}`);
    if (res) {
      return res;
    }
  } catch (error) {
    if (error instanceof Error) return handleErrors(error);
  }
  return undefined;
};
export const createProduct = async (payload: FormData) => {
  const res = await Api.post<ApiResponse<IProduct>>("/products/", payload);
  return res.data;
};

export const editProduct = async (payload: { data: FormData; id: string }) => {
  const res = await Api.patch<ApiResponse<IProduct>>(
    `/products/${payload.id}`,
    payload.data
  );
  return res.data;
};
