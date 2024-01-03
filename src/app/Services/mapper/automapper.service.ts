import { Injectable } from '@angular/core';
import {Dictionary, has, map} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AutomapperService {

  constructor() { }

  map<TTarget = Object>(srcObject: Object | any, targetObject: Object): TTarget{
    let targetObejectres: {[key: string]: any} = {} 
    for (const key in srcObject) {
      if (has(targetObject, key)) {
        targetObejectres[key] = srcObject[key];
        
      }
    }
  
    return targetObejectres as TTarget ;
  }
}
