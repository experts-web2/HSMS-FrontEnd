import { Injectable } from '@angular/core';
import { has, isArray } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AutomapperService {

  constructor() { }

  map<TTarget = Object>(srcObject: Object | any, targetObject: Object): TTarget {
    let targetObejectres: {[key: string]: any} = {} 
    for (const key in srcObject) {
      if (has(targetObject, key)) {
        let valueType = typeof(srcObject[key]);
        if(valueType === 'object' && srcObject[key]){
          if(isArray(srcObject[key])){
            targetObejectres[key] = []
            for (const index in srcObject[key]) {
              targetObejectres[key][index] = this.map<any>(srcObject[key][index], targetObejectres[key][index])
            }
            
          }else {
            targetObejectres[key] = this.map<any>(srcObject[key], targetObejectres[key])

          }
        } else {
          targetObejectres[key] = srcObject[key];
        }
        
      }
    }
  
    return targetObejectres as TTarget ;
  }
}
