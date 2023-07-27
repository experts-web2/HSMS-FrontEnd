export interface ILabeTest {
    id: string;
    createdAt: Date;
    createdBy: string;
    createdById: string;
    description: string;
    modifiedAt: Date;
    modifiedBy: string;
    modifiedById: string;
    name: string;
    price: number;
    testCategoryId: string;
    normalValues:string;
    code:number,
    testSample:string,
    reportingTime:string,
}