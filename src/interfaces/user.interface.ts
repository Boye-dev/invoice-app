import { FileWithUrl } from "../shared/components/FileUpload";

export interface CreateUserRequest {
  firstname: string;
  email: string;
  lastname: string;
  password: string;
  phoneNumber: string;
  businessName: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessZip: string;
  businessCountry: string;
  businessPhone: string;
  businessEmail: string;
  businessWebsite?: string;
  businessLogo: FileWithUrl[] | null;
  confirmPassword: string;
  profilePicture: FileWithUrl[] | null;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRefresh {
  token: string;
}
export interface IUserVerify {
  id: string;
  token: string;
}

export interface IUserReset {
  password: string;
}
export interface IUser extends Document {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  profilePicture?: string;
  phoneNumber: string;
  password: string;
  businessName: string;
  businessAddress: string;
  businessLogo: string;
  businessCity: string;
  businessState: string;
  businessZip: string;
  businessCountry: string;
  businessPhone: string;
  businessEmail: string;
  businessWebsite: string;
  verificationToken?: string;
  resetToken?: string;
  resetTokenExpires?: Date;
  verified: boolean;
}
