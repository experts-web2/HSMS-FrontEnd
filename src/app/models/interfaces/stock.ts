import { IBaseResponse } from "./BaseResponse"

export interface IStock extends IBaseResponse {
    totalPacksQty: number
    totalUnitsQty: number
    averageUnitsPerPack: number
    averagePackPrice: number
    averageUnitPrice: number
    totalStockAmount: number
    medicineId: string
    stockItemResponses: IStockItem[]
  }
  
  export interface IStockItem extends IBaseResponse {
    batchNo: string
    packsQty: number
    unitsQty: number
    unitsPerPack: number
    packPrice: number
    unitPrice: number
    mfgDate: string
    expDate: string
    stockId: string
  }
  