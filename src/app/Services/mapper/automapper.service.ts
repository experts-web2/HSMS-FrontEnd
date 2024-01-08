import { Injectable } from '@angular/core';
import { has, isArray } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AutomapperService {

  constructor() { }

  map<TTarget = Object>(srcObject: Object | any, targetObject: Object| any): TTarget {
    let targetObejectres: {[key: string]: any} = {} 
    for (const key in srcObject) {
      if (has(targetObject, key)) {
        let valueType = typeof(srcObject[key]);
        let targetValueType = typeof(targetObject[key])
        if(valueType === 'object' && srcObject[key] && targetValueType === 'object'){
          if(isArray(srcObject[key])){
            targetObejectres[key] = []
            for (const index in srcObject[key]) {
              targetObejectres[key][index] = this.map<any>(srcObject[key][index], targetObject[key][index])
            }
            
          }else {
            targetObejectres[key] = this.map<any>(srcObject[key], targetObject[key])

          }
        } else {
          targetObejectres[key] = srcObject[key];
        }
        
      }
    }
  
    return targetObejectres as TTarget ;
  }
}
