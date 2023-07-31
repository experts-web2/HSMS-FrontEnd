export interface IBaseResponse
{    
    id: string;
    createdAt: Date;
    modifiedAt?: Date;
    createdById?: string;
    createdBy?: string;
    modifiedById?: string;
    modifiedBy?: string;
}