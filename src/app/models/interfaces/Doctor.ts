import { IUser } from "./user"

export interface IDoctor {
    userId: string
    name: string
    gender: number
    opd?: boolean
    token?: boolean
    appointment?: boolean
    consultationFee: number
    sharePrice: number
    speciality?: string
    biography?: string
    qualification?: string
    service?: string
    timings?: string
    user?: IUser
    patients?: any[]
    departments?: any[]
    appointments?: any[]
    id: string
    createdAt?: string
    modifiedAt?: string
    createdById?: string
    createdBy?: string
    modifiedById?: string
    modifiedBy?: string
  }