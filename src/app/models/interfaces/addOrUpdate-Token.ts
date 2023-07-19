
  export interface IAddOrUpdateToken {
    patientId: string
    tokenDetails: ITokenDetail[]
    doctorId?: string
    patientCheckedIn?: boolean
  }
  
  export interface ITokenDetail {
    tokenTypes: number
    invoice: IInvoice
    pulseHeartRate?: number
    temperature?: number
    bloodPressure?: string
    respiratoryRate?: number
    bloodSugar?: number
    height?: number
    weight?: number
    bodyMassIndex?: number
    bodySurfaceArea?: number
    oxygenSaturation?: number
  }
  
  export interface IInvoice {
    amountPaid: number
    paymentType: number
    invoiceItems: IInvoiceItem[]
    totalDiscount: number
    grandTotal: number
  }
  
  export interface IInvoiceItem {
    treatmentId: string
    paidAmount: number
    discountAmount: number
    discountType: number
    othersType?: number
    othersName?: string
  }
  