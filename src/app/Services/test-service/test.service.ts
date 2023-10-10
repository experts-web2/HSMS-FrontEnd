import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services';
import { HttpClient } from '@angular/common/http';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { IAddOrUpdateTest } from 'src/app/models/interfaces/addOrUpdate-test';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { Observable, of } from 'rxjs';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { patientData } from 'src/data';
import { IDataSourceResponse } from 'src/app/models/interfaces/DataSourceResponse';
import { ILabeTest } from 'src/app/models/interfaces/labTest';

@Injectable({
  providedIn: 'root'
})
export class TestService extends HttpService {

  private baseEndPoint: string = BaseEndPoints.Test;

  constructor(private readonly http: HttpClient) {
    super(http)
  }

  addTest(test: IAddOrUpdateTest){
    return this.post(`${this.baseEndPoint}`, test);
  }
 
  deleteTest(test: ILabeTest){
    return this.delete(`${this.baseEndPoint}/${test.id}`);
  }

  updateTest(id: string, test: IAddOrUpdateTest){
    return this.put(`${this.baseEndPoint}/${id}`, test)
  }

  getTests(fetchRequest: IFetchRequest = {}): Observable<IDataSourceResponse<ILabeTest>>{
    return this.post(`${this.baseEndPoint}/all`, fetchRequest);
  }

  getTestById(id: string){
    return this.get(`${this.baseEndPoint}/${id}`);
  }

  getTestDropDown(): Observable<Array<IDropDown>>{
    return this.get(`${this.baseEndPoint}/dropdown`);
  }
  
  getTestByPatientid(id: string){
    return this.get(`${this.baseEndPoint}/getbypatientid/${id}`);
  }

}
