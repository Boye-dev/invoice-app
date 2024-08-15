import { PaymentStatus } from "../interfaces/invoice.interface";

export const convertAllLowercaseToSentenceCase = (value: string) => {
  if (value) {
    return value
      .replace(/_/g, " ")
      .split(" ")
      .map((item: string) => item[0].toUpperCase() + item.substring(1))
      .join(" ");
  }
  return "";
};

export const convertAllUpperCaseToSentenceCase = (value: string) => {
  if (value) {
    return value
      .replace(/_/g, " ")
      .split(" ")
      .map((item: string) => item[0] + item.substring(1).toLowerCase())
      .join(" ");
  }
  return "";
};

export const getStatusColor = (value: keyof typeof PaymentStatus) => {
  switch (value) {
    case PaymentStatus.INSTALLMENT:
      return "orange";
    case PaymentStatus.PAID_CASH:
      return "green";
    case PaymentStatus.PAID_ONLINE:
      return "lightgreen";
    case PaymentStatus.UNPAID:
      return "red";
    default:
      break;
  }
};
