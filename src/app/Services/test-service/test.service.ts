import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';
import { HttpClient } from '@angular/common/http';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { IAddOrUpdateTest } from 'src/app/models/interfaces/addOrUpdate-test';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
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
    return this.post(`${this.baseEndPoint}/add`, test);
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

}
