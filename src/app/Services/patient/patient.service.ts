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
import { IDataSourceResponse } from 'src/app/models/interfaces/DataSourceResponse';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends HttpService{

  constructor(private http: HttpClient) {
    super(http)
  }
  baseEndPoint: string = BaseEndPoints.Patient

  addPatient(data: IAddOrUpdatePatient): Observable<IPatient>{
   return this.post(`${this.baseEndPoint}`, data);
  }

  getPatients(fetchRequest: IFetchRequest = {}): Observable<IDataSourceResponse<IPatient>>{
    return this.post(`${this.baseEndPoint}/all`, fetchRequest);
  }

  getPatientById(patientId: string): Observable<IPatient>{
    return this.get(`${this.baseEndPoint}/${patientId}`)
  }

  getPatientsDropdown(patientSerch?:string): Observable<any>{
    return this.get(`${this.baseEndPoint}/dropdown?search=${patientSerch}`);
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

  generateMrNo(): Observable<string>{
    return this.get(`${this.baseEndPoint}/generate/mrno`)
  }
}
