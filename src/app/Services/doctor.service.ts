import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './httpService/http.service';
import { Observable } from 'rxjs';
import { BaseEndPoints } from '../constants/enums/base-end-points';
import { IAddOrUpdateDoctor, IAddOrUpdateDoctorRequest } from '../models/interfaces/addOrUpdate-Doctor';
import { IFetchRequest } from '../models/interfaces/fetchTableRequest';

@Injectable({
  providedIn: 'root'
})
export class DoctorService extends HttpService {

  baseEndPoints: string = BaseEndPoints.Doctor;

  constructor(private readonly http: HttpClient) {
    super(http)
   }

   addDoctor(data: IAddOrUpdateDoctorRequest): Observable<any>{
    return super.post(`${this.baseEndPoints}/add`, data);
  }


  getDoctors(fetchRequest: IFetchRequest = {}): Observable<any>{
    return super.post(`${this.baseEndPoints}/all`, fetchRequest);
  }


  updateDoctor(data: IAddOrUpdateDoctorRequest,id:string): Observable<any>{
    return super.put(`${this.baseEndPoints}/update/${id}`, data);
  }

  deleteDoctor(doctor: any){
    return this.delete(`${this.baseEndPoints}/delete/${doctor.id}`);
  }
}
