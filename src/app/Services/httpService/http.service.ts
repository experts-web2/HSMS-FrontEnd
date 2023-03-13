import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
export  abstract class HttpService {

  constructor(private readonly httpClient: HttpClient) {
  }

 protected post(url: string, data: any): Observable<any> {
   return this.httpClient.post(url, data);
 }

 protected get(url: string): Observable<any>{
   return this.httpClient.get(url);
 }
 
 protected put(url: string, data: any): Observable<any>{
   return this.httpClient.put(url, data);
 }  
 
 protected delete(url: string): Observable<any>{
   return this.httpClient.delete(url);
 }}
