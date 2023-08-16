import { IBaseResponse } from "./BaseResponse"
import { IUser } from "./user"

export interface IDoctor extends IBaseResponse {
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
}