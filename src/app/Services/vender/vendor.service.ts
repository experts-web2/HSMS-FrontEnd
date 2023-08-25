import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services';
import { HttpClient } from '@angular/common/http';
import { IVendorRequest } from '../../models/interfaces/vendorRequest';
import { BaseEndPoints } from '../../constants/enums/base-end-points';
import { Observable } from 'rxjs';
import { IDropDown } from '../../models/interfaces/Dropdown';
import { IVendor } from '../../models/interfaces/Vendor';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';

@Injectable({
  providedIn: 'root'
})
export class VendorService extends HttpService {

  constructor(private readonly http: HttpClient) {
    super(http)
  }

  private baseEndPoint = BaseEndPoints.Vendor;

  addVendor(vendor: IVendorRequest): Observable<IVendor> {
    return this.post(`${this.baseEndPoint}`, vendor);
  }

  getVendors(): Observable<Array<IDropDown>> {
    return this.get(`${this.baseEndPoint}/dropdown`);
  }

  getVendorsList(fetchRequest: IFetchRequest = {}){
    return this.post(`${this.baseEndPoint}/all`, fetchRequest);
  }

  deleteVendor(test: any){
    return this.delete(`${this.baseEndPoint}/delete/${test.id}`);
  }

  updateVendor(id: string, test: IVendorRequest){
    return this.put(`${this.baseEndPoint}/update/${id}`, test)
  }

}
