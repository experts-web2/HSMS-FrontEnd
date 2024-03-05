import { Pipe, PipeTransform } from '@angular/core';
import { isArray } from 'lodash';

@Pipe({
  name: 'filterBy',
  standalone: true
})
export class FilterByPipe implements PipeTransform {

  transform(value: Array<any>, property: string, matchValue: Array<any> | any, operator: 'match' | 'noMatch'): Array<any> {


    if(isArray(matchValue)){
      return value.filter((x) => operator === 'match' ? matchValue.includes(x[property]) : !matchValue.includes(x[property]));
    }

    return value.filter((x) => operator === 'match' ? matchValue === x[property] : matchValue !== x[property]);

  }

}
