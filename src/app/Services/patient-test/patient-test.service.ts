import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { Observable } from 'rxjs';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';


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

  getLabtestsBytodayInvoicedByPatientid(patientId: string){
    return this.get(`${this.baseEndPoint}/labtestsbytodayinvoiced?patientId=${patientId}`);
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

  getsamplecollections(fetchRequest: IFetchRequest = {}): Observable<any>{
    return this.post(`${this.baseEndPoint}/getsamplecollections`,fetchRequest);
  }

  generateTestSampleID(sampleIdPayload:any){
    return this.get(`${BaseEndPoints.PatientSample}/generate/sampleid?patientId=${sampleIdPayload.patientId}&testTypeId=${sampleIdPayload.testCategoryId}`);
  }

  addPatientTestSamples(fetchRequest: IFetchRequest = {}){
    return this.post(`${BaseEndPoints.PatientSample}/all`, fetchRequest);
  }

  addPatientTestReport(fetchRequest:any){
    return this.post(`${BaseEndPoints.Patientsamplereport}/add`, fetchRequest);
  }

  patientTestInvoice(patientSerch?:string): Observable<any>{
    return this.get(`${BaseEndPoints.Patienttestinvoice}/patientdropdownbytodayinvoiced?search=${patientSerch}`);
  }

  addPatientTest(test:any){
    return this.post(`${BaseEndPoints.Patienttestinvoice}/add`, test);
  }
}
