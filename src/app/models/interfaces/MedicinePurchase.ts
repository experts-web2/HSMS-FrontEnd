import { DiscountTypes } from "src/app/constants/enums/DiscountTypes";
import { IBaseResponse } from "./BaseResponse";

export interface IMedicinePurchase extends IBaseResponse {
    discountType: DiscountTypes;
    discountAmount: number;
    totalAmount: number;
    netTotalAmount: number;
    discountInp: number;
    vendorId: string;
    medicinePurchaseItems: Array<IMedicinePurchaseItem> | null;
}

export interface IMedicinePurchaseItem extends IBaseResponse {
    packsQty: number;
    unitsPerPack: number;
    packPrice: number;
    mfgDate: string;
    expDate: string;
    medicineId: string;
    medicineBrandId: string;
}