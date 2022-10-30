import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  transform(value: number | undefined): String | null {
    if (value) {

      return Math.round(value) + 'km';
    }
    return null;
  }

}
