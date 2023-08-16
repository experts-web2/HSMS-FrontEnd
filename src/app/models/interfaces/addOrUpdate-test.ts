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
    patientTestInvoiceItemId?: any
  }


  export interface ITestReport {
    patientId: string
    doctorId: string
    testReport: TestReportItems[]
  }
  
  export interface TestReportItems {
    testId: string
    normalValues: string
    testValue: string
    report: string
    remarks: string
    patientTestInvoiceItemId: string
  }


  export interface IPatientReport {
    mrNo: string
    patientName: string
    testName: string
    price: number
    sampleCollectionStatus: string
    id: string
    createdAt: string
    modifiedAt: any
    createdById: string
    createdBy: string
    modifiedById: any
    modifiedBy: any
  }