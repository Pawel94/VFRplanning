import {Pipe, PipeTransform} from '@angular/core';
import {FlightParams} from "@shared";
import {PlaneType} from "@features/vfr-parameters";

@Pipe({
  name: 'maxHours',
  standalone: true
})
export class MaxHoursPipe implements PipeTransform {

  transform(value?: PlaneType, value2?: FlightParams): number {
    if (value2 && value) {
      return (value2.planeFuel / value.fuelConsumption.cruise) * 60;
    }
    return 0;
  }

}
