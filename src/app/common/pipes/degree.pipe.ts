import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'degree',
  standalone:true
})
export class DegreePipe implements PipeTransform {

  transform(valueToDegree: number | string | undefined, isLat: boolean = false): string | null {


    if (valueToDegree != undefined && valueToDegree !== "") {
      let extension = this.setDirection(isLat, Number(valueToDegree));
      return Number(valueToDegree).toFixed(2) + "º" + extension;
    }
    return null;
  }


  private setDirection(isLat: boolean, value: number): string {
    if (isLat) {
      if (value > 0) return "N";
      else if (value < 0) return "S"
      else return ""
    } else {
      if (value > 0) return "E";
      else if (value < 0) return "W"
      else return ""
    }
  }
}

