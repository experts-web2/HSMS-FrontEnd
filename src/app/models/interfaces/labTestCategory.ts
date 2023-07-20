export interface ILabTestCategory {
    id: string;
    createdAt: Date;
    createdBy: string;
    modifiedAt: Date;
    modifiedBy: string;
    modifiedById: string;
    createdById: string;
    labTests: any[];
    name: string;
    code:number,
    testSample:string,
    reportTime:string,
}