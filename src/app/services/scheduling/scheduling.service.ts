import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { IScheduleRequest } from 'src/app/models/interfaces/schedule-Request';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { AsyncPipe } from '@angular/common';

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

  getSchedules(query: IFetchRequest): Observable<any>{
    return this.post(`${BaseEndPoints.Scheduling}/all`, query);
  }
}