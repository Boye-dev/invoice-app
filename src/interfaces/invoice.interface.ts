// import { IClient } from "./client.interface";
// import { IParams } from "./helper.interface";
// import { IProduct } from "./product.interface";

import { IClient } from "./client.interface";
import { IParams } from "./helper.interface";
import { IProduct } from "./product.interface";

export enum InvoiceType {
  QUOTATION = "QUOTATION",
  INVOICE = "INVOICE",
}
export enum PaymentStatus {
  INSTALLMENT = "INSTALLMENT",
  FULLY_PAID = "FULLY_PAID",
  PAID_CASH = "PAID_CASH",
  PAID_ONLINE = "PAID_ONLINE",
  UNPAID = "UNPAID",
}
export interface IInvoice {
  name: string;
  user: string;
  client: IClient;
  products: (string | IProduct)[];
  type: InvoiceType;
  paymentStatus: PaymentStatus;
  invoiceNumber: string;
  _id: string;
}

export interface CreateInvoice {
  name: string;
  client: {
    firstname: string;
    lastname: string;
    address: string;
    email: string;
    phoneNumber: string;
    _id: string;
  };
  products: string[];
  type: string;
  paymentStatus: string;
}

export interface IInvoiceParams extends IParams {
  paymentStatus?: string;
  type?: keyof typeof InvoiceType;
  vas?: string[];
}
