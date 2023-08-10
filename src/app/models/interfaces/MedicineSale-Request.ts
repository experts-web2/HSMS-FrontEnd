import { DiscountTypes } from "src/app/constants/enums/DiscountTypes";


export interface IMedicineSaleRequest {
    customerName: string;
    discountType: DiscountTypes;
    discountAmount: number;
    totalAmount: number;
    netTotalAmount: number;
    discountInp: number;
    medicineSaleItems: Array<IMedicineSaleItemRequest> | null;
}

export interface IMedicineSaleItemRequest {
    unitQty: number;
    unitPrice: number;
    medicineId: string;
}