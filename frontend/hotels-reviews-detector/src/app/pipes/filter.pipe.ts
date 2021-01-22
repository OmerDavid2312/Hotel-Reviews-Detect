import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array: any[], filter: any, propName: string): any[] {

    if (!filter) {
      return array
    }

    let filteredArray = [];

    for (const item of array) {
      if (item[propName].toLowerCase().startsWith(filter.toLowerCase())) {
        filteredArray.push(item);
      }
    }

    return filteredArray
  }

}
