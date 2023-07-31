export interface IAddOrUpdateTest{
    testSample:string,
    reportingTime:string,
    testCategoryId: string,
    name: string,
    description: string,
    price: number
    normalValues: string
}


export interface ILabTest {
    testCategoryId: string
    name: string
    description: string
    price: number
    normalValues: string
    testSample: string
    reportingTime: number
    code: number
    id: string
    createdAt: string
    modifiedAt: any
    createdById: string
    createdBy: string
    modifiedById: any
    modifiedBy: any
  }