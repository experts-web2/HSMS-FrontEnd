import { Injectable } from '@angular/core';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { HttpService } from '../httpService/http.service';
import { HttpClient } from '@angular/common/http';
import { IAddOrUpdateCategory } from 'src/app/models/interfaces/addOrUpdate-Category';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';

@Injectable({
  providedIn: 'root'
})
export class TestCategoryService extends HttpService {

  private baseEndPoint: string = BaseEndPoints.Category;

  constructor(private readonly http: HttpClient) {
    super(http)
  }

  addCategory(category: IAddOrUpdateCategory){
    return this.post(`${this.baseEndPoint}/add`, category);
  }

  deleteCategory(id: string){
    return this.delete(`${this.baseEndPoint}/delete/${id}`);
  }

  updateCategory(id: string, category: IAddOrUpdateCategory){
    return this.put(`${this.baseEndPoint}/update/${id}`, category)
  }

  getCategories(fetchRequest: IFetchRequest = {}){
    return this.post(`${this.baseEndPoint}/all`, fetchRequest);
  }

  getCategoryById(id: string){
    return this.get(`${this.baseEndPoint}/byid/${id}`);
  }
}