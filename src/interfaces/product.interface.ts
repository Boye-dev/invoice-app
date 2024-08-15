import { FileWithUrl } from "../shared/components/FileUpload";
import { IParams } from "./helper.interface";
import { IUser } from "./user.interface";

export interface IProduct {
  name: string;
  price: number | string;
  description: string;
  user: IUser;
  image?: string;
  _id: string;
}

export interface CreateProduct {
  name: string;
  price: number | string;
  description: string;
  image?: FileWithUrl[] | null;
}

export interface IProductParams extends IParams {}
