import { DiscountTypes } from "src/app/constants/enums/DiscountTypes";
import { IBaseResponse } from "./BaseResponse";

export interface IMedicineSale extends IBaseResponse {
    customerName: string;
    discountType: DiscountTypes;
    discountAmount: number;
    totalAmount: number;
    netTotalAmount: number;
    discountInp: number;
    medicineSaleItemsResponse: Array<IMedicineSaleItem> | null;
}

export interface IMedicineSaleItem extends IBaseResponse {
    unitQty: number;
    unitPrice: number;
    medicineId: string;
}