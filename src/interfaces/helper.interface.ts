export interface ApiResponse<T> {
  message: string;
  statusCode: string;
  data?: T;
}
