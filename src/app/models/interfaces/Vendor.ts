export interface IVendor {
    id: string;
    createdAt: Date;
    modifiedAt?: Date;
    createdById?: string;
    createdBy?: string;
    modifiedById?: string;
    modifiedBy?: string;
    firstName: string;
    lastName?: string;
    companyName?: string;
    phoneNumber?: string;
    address?: string;
  }