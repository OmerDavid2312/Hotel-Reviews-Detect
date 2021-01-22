import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'short'
})
export class ShortPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if(value.length > 25) {
      return value.substring(0, 25) + "..."
    } else {
      return value
    }
  }

}
