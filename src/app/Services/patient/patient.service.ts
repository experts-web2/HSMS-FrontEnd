import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { patientData } from 'src/data'
import { HttpService } from 'src/app/services';
import { HttpClient } from '@angular/common/http';
import { BaseEndPoints } from '../../constants/enums/base-end-points';
import { IAddOrUpdatePatient } from 'src/app/models/interfaces/addOrUodate-Patient';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { IPatient } from 'src/app/models/interfaces/patient-model';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends HttpService{

  constructor(private http: HttpClient) {
    super(http)
  }
  baseEndPoint: string = BaseEndPoints.Patient

  addPatient(data: IAddOrUpdatePatient): Observable<IPatient>{
   return this.post(`${this.baseEndPoint}/add`, data);
  }

  getPatients(fetchRequest: IFetchRequest = {}): Observable<any>{
    return this.post(`${this.baseEndPoint}/all`, fetchRequest);
  }

  getPatientById(patientId: string): Observable<IPatient>{
    return this.get(`${this.baseEndPoint}/byid/${patientId}`)
  }

  getPatientsDropdown(patientSerch?:string): Observable<any>{
    return this.get(`${this.baseEndPoint}/dropdown?search=${patientSerch}`);
  }

  patientTestInvoice(patientSerch?:string): Observable<any>{
    return this.get(`${BaseEndPoints.Patienttestinvoice}/patientdropdownbytodayinvoiced?search=${patientSerch}`);
  }

  // patienttestinvoiceitem/labtestsbytodayinvoiced
  patientLabtestsTestInvoice(patientSerch?:string): Observable<any>{
    return this.get(`${BaseEndPoints.Patienttestinvoiceitem}/labtestsbytodayinvoiced?patientId=${patientSerch}`);
  }

  getsamplecollections(fetchRequest: IFetchRequest = {}): Observable<any>{
    return this.post(`${BaseEndPoints.Patienttestinvoiceitem}/getsamplecollections`,fetchRequest);
  }

  getAppointments() {
    return of(patientData.getAppointments())
  }

  getMessages() {
    return of(patientData.getMessages())
  }

  getLabTests() {
    return of(patientData.getLabTest())
  }

  getTokens() {
    return of(patientData.getTokenData())
  }

  getPatientDropDown(): Observable<Array<IDropDown>>{
    return this.get(`${this.baseEndPoint}/dropdown`);
  }
}
