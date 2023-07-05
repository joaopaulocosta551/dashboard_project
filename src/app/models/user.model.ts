import { AddressModel } from "./address.model";
import { CompanyModel } from "./company.model";

export type UserModel = {
    id?: number;
    name: string;
    username: string;
    email: string;
    address?: AddressModel;
    phone: string;
    website: string;
    company?: CompanyModel;
  };