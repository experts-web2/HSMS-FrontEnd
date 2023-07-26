import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
export  abstract class HttpService {
  
  protected baseUrl = `${environment.backendurl}api`
  constructor(private readonly httpClient: HttpClient) {
  }

 protected post(url: string, data: any): Observable<any> {
   return this.httpClient.post(this.baseUrl + `/${url}`, data);
 }

 protected get(url: string): Observable<any>{
   return this.httpClient.get(this.baseUrl + `/${url}`);
 }
 
 protected put(url: string, data: any): Observable<any>{
   return this.httpClient.put(this.baseUrl + `/${url}`, data);
 }  
 
 protected patch(url: string, data: any): Observable<any>{
   return this.httpClient.patch(this.baseUrl + `/${url}`, data);
 }  
 
 protected delete(url: string): Observable<any>{
   return this.httpClient.delete(this.baseUrl + `/${url}`);
 }}
