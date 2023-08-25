import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { IAddOrUpdateDoctorRequest } from 'src/app/models/interfaces/addOrUpdate-Doctor';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { HttpService } from '../http/http.service';
import { IDoctor } from 'src/app/models/interfaces/Doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService extends HttpService {

  baseEndPoints: string = BaseEndPoints.Doctor;

  constructor(private readonly http: HttpClient) {
    super(http)
   }

   addDoctor(data: IAddOrUpdateDoctorRequest): Observable<any>{
    return this.post(`${this.baseEndPoints}`, data);
  }


  getDoctors(fetchRequest: IFetchRequest = {}): Observable<any>{
    return this.post(`${this.baseEndPoints}/all`, fetchRequest);
  }

  getDoctorsDropDown(): Observable<any>{
    return this.get(`${this.baseEndPoints}/dropdown`);
  }


  updateDoctor(data: IAddOrUpdateDoctorRequest,id:string): Observable<any>{
    return this.put(`${this.baseEndPoints}/update/${id}`, data);
  }

  deleteDoctor(doctor: any){
    return this.delete(`${this.baseEndPoints}/delete/${doctor.id}`);
  }

  isEmailInUse(email: string): Observable<boolean>{
    return this.get(`${BaseEndPoints.User}/checkemail/${email}`);
  }

  getDoctorDropDown():Observable<Array<IDropDown>>{
    return this.get(`${this.baseEndPoints}/dropdown`)
  }

  getDoctorById(doctorId: string): Observable<IDoctor>{
    return this.get(`${this.baseEndPoints}/${doctorId}`)
  }
}
