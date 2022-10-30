import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'degree'
})
export class DegreePipe implements PipeTransform {

  transform(valueToDegree: number | string): string {


    return Number(valueToDegree).toFixed(2) + "º";
  }

}
