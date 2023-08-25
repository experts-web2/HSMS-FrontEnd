import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { IScheduleRequest } from 'src/app/models/interfaces/schedule-Request';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService extends HttpService {

  constructor(private readonly http: HttpClient) {
    super(http)
   }

  addSchedule(schedule: IScheduleRequest): Observable<any>{
    return this.post(`${BaseEndPoints.Scheduling}`, schedule);
  }

  // getPrescriptionById(id: string): Observable<IPrescription>{
  //   return this.get(`${BaseEndPoints.Prescription}/${id}`)
  // }

  // getPrescriptionByTokenId(tokenId: string): Observable<IPrescription>{
  //   return this.get(`${BaseEndPoints.Prescription}/getbytokenid/${tokenId}`)
  // }

  // updatePrescriptionById(id: string, prescription: IPrescriptionRequest): Observable<any>{
  //   return this.post(`${BaseEndPoints.Prescription}/${id}`, prescription)
  // }
  
  // getPrescriptionHistoryDropDown(patientId: string): Observable<Array<IDropDown>>{
  //   return this.get(`${BaseEndPoints.Prescription}/dropdownbypatientid/${patientId}`);
  // }
}