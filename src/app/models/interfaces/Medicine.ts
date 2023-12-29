import { IBaseResponse } from "./BaseResponse";

export interface IMedicine extends IBaseResponse {
  name: string;
  potency: number;
  salt: string;
  price: number;
  brandName: string;
  brandID?: string;
  medicineType: number;
  potencyUnits: number;
  stockQuantity: number;
}
