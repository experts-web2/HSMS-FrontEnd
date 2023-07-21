export interface IToken {
    id: string
    createdAt: string
    modifiedAt: string
    createdById: string
    createdBy: string
    modifiedById: string
    modifiedBy: string
    doctorId: string
    doctorName: string
    patientId: string
    patientName: string
    tokenNo: number
    patientCheckedIn: boolean
    isViewed: boolean
  }