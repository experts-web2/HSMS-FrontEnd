import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { Observable } from 'rxjs';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { ILabTest, ITestReport } from 'src/app/models/interfaces/addOrUpdate-test';
import { ILabInvoice } from 'src/app/models/interfaces/lab-Invoice';
import { IPatientSampleRequest } from 'src/app/models/interfaces/test-sample-request';
import { IPatientSample } from 'src/app/models/interfaces/testSample';


@Injectable({
  providedIn: 'root'
})
export class PatientTestService extends HttpService {

  constructor(private readonly http: HttpClient) {
    super(http)
  }

  private baseEndPoint = BaseEndPoints.Patienttestinvoiceitem;

  getTestInvoiceItemsByPatientid(patientId: string){
    return this.get(`${this.baseEndPoint}/testdropdownbytodayinvoiced?patientId=${patientId}`);
  }

  getLabtestsBytodayInvoicedByPatientid(invoiceId: string): Observable<Array<ILabTest>>{
    return this.get(`${this.baseEndPoint}/labtestsbytodayinvoiced?invoiceId=${invoiceId}`);
  }

  getLabTestInvoiceById(invoiceId: string): Observable<ILabInvoice>{
    return this.get(`${'patienttestinvoice'}/${invoiceId}`);
  }

  getpendingsamplecollections(fetchRequest: IFetchRequest = {}){
    return this.post(`${this.baseEndPoint}/getpendingsamplecollections`, fetchRequest);
  }

  getTestPatientDropdown(): Observable<Array<any>>{
    return this.get(`${this.baseEndPoint}/gettodaypatienttest`);
  }

  patientLabtestsTestInvoice(patientSerch?:string): Observable<any>{
    return this.get(`${this.baseEndPoint}/labtestsbytodayinvoiced?patientId=${patientSerch}`);
  }
//
  getsamplecollections(fetchRequest: IFetchRequest = {},status:string): Observable<any>{
    return this.post(`${this.baseEndPoint}/getsamplecollections?status=${status}`,fetchRequest);
  }

  generateTestSampleID(sampleIdPayload:any){
    return this.get(`${BaseEndPoints.PatientSample}/generate/sampleid?patientId=${sampleIdPayload.patientId}&testTypeId=${sampleIdPayload.testCategoryId}`);
  }

  addPatientTestSamples(sampleRequest: IPatientSampleRequest): Observable<Array<IPatientSample>>{
    return this.post(`${BaseEndPoints.PatientSample}`, sampleRequest);
  }

  addPatientTestReport(fetchRequest:ITestReport){
    return this.post(`${BaseEndPoints.Patientsamplereport}`, fetchRequest);
  }

  patientTestInvoice(patientSerch?:string): Observable<any>{
    return this.get(`${BaseEndPoints.Patienttestinvoice}/patientinfobyfilter?search=${patientSerch}`);
  }

  addPatientTest(test:any): Observable<ILabInvoice>{
    return this.post(`${BaseEndPoints.Patienttestinvoice}`, test);
  }
}
