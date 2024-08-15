import { IQueryParams } from "../utils/query-params";

export interface ApiResponse<T> {
  message: string;
  statusCode: string;
  data?: T;
}
export interface IFilter {
  label: string;
  values: any;
  key: string;
}
export interface IParams extends IQueryParams {
  page: number;
  pageSize: number;
  sort?: string;
  search?: string;
}
