import { Injectable } from '@angular/core';
import { HttpService } from './httpService/http.service';
import { HttpClient } from '@angular/common/http';
import { IVendorRequest } from '../models/interfaces/vendorRequest';
import { BaseEndPoints } from '../constants/enums/base-end-points';
import { Observable } from 'rxjs';
import { IDropDown } from '../models/interfaces/Dropdown';
import { IVendor } from '../models/interfaces/Vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService extends HttpService {

  constructor(private readonly http: HttpClient) {
    super(http)
  }

  private baseEndPoint = BaseEndPoints.Vendor;

  addVendor(vendor: IVendorRequest): Observable<IVendor> {
    return this.post(`${this.baseEndPoint}/add`, vendor);
  }

  getVendors(): Observable<Array<IDropDown>> {
    return this.get(`${this.baseEndPoint}/dropdown`);
  }

}
