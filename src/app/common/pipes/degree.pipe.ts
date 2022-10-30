import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'degree'
})
export class DegreePipe implements PipeTransform {

  transform(valueToDegree: number | string | undefined,extension: string = ''): string | null {

    if (valueToDegree != undefined) {

      return Number(valueToDegree).toFixed(2) + "º" + extension;
    }
    return null;
  }

}
