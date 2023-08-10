export interface IMedicinePurchaseRequest {
    discountType: number
    discountAmount: number
    totalAmount: number
    netTotalAmount: number
    discountInp: number
    vendorId: string
    medicinePurchaseItems: Array<MedicinePurchaseItem>
}

export interface MedicinePurchaseItem {
    packsQty: number
    unitsPerPack: number
    packPrice: number
    mfgDate: string
    expDate: string
    medicineId: string
    medicineBrandId: string
}
