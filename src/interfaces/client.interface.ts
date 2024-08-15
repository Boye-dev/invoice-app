import { IParams } from "./helper.interface";
import { IUser } from "./user.interface";

export interface IClient {
  firstname: string;
  lastname: string;
  address: string;
  email: string;
  phoneNumber: string;
  user: IUser;
  _id: string;
}

export interface CreateClient {
  firstname: string;
  lastname: string;
  address: string;
  email: string;
  phoneNumber: string;
}

export interface IClientParams extends IParams {}
