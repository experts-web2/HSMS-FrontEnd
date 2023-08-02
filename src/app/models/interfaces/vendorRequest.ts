export interface IVendorRequest {
    firstName: string;
    lastName?: string;
    companyName?: string;
    phoneNumber?: string;
    address?: string;
}

export interface IVendor {
    firstName: string
    lastName: string
    companyName: string
    phoneNumber: string
    address: string
    id: string
    createdAt: string
    modifiedAt: any
    createdById: string
    createdBy: string
    modifiedById: any
    modifiedBy: any
  }