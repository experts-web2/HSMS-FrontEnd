import { IBaseResponse } from "./BaseResponse"
import { ILabTest } from "./addOrUpdate-test"
import { IPatient } from "./patient-model"

export interface ILabInvoice extends IBaseResponse {
    totalDiscount: number
    invoiceNumber: string
    grandTotal: number
    amountPaid: number
    priority: string
    invoiceNote: string
    paymentType: number
    patient: IPatient
    doctorId: string
    patientId: string
    completionDate: string
    invoiceItems: IInvoiceItem[]
  }

  export interface IInvoiceItem extends IBaseResponse {
    othersType: number
    othersName: string
    paidAmount: number
    description: string
    discountAmount: number
    sampleCollectionStatus: string
    discountType: number
    reportingHours: number
    labTest: ILabTest
    patientId: string
    testId: string
    patientTestInvoiceId: string
  }