import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services';
import { HttpClient } from '@angular/common/http';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { IAddOrUpdateTest } from 'src/app/models/interfaces/addOrUpdate-test';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { ILabeTest } from 'src/app/models/interfaces/labTest';
import { Observable, of } from 'rxjs';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { patientData } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class TestService extends HttpService {

  private baseEndPoint: string = BaseEndPoints.Test;

  constructor(private readonly http: HttpClient) {
    super(http)
  }

  addTest(test: IAddOrUpdateTest){
    return this.post(`${this.baseEndPoint}/add`, test);
  }
  addPatientTest(test:any){
    return this.post(`${BaseEndPoints.Patienttestinvoice}/add`, test);
  }
  getTestPatientDropdown(): Observable<Array<any>>{
    return this.get(`${BaseEndPoints.Patienttestinvoiceitem}/gettodaypatienttest`);
  }

  deleteTest(test: ILabeTest){
    return this.delete(`${this.baseEndPoint}/delete/${test.id}`);
  }

  updateTest(id: string, test: IAddOrUpdateTest){
    return this.put(`${this.baseEndPoint}/update/${id}`, test)
  }

  getTests(fetchRequest: IFetchRequest = {}){
    return this.post(`${this.baseEndPoint}/all`, fetchRequest);
  }

  getTestById(id: string){
    return this.get(`${this.baseEndPoint}/byid/${id}`);
  }

  getTestDropDown(): Observable<Array<IDropDown>>{
    return this.get(`${this.baseEndPoint}/dropdown`);
  }
  
  getTestByPatientid(id: string){
    return this.get(`${this.baseEndPoint}/getbypatientid/${id}`);
  }
  getTestInvoiceItemsByPatientid(patientId: string){
    return this.get(`${BaseEndPoints.Patienttestinvoiceitem}/testdropdownbytodayinvoiced?patientId=${patientId}`);
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
}
