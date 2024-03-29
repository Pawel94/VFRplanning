import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {

  transform(value?: number, toHours: boolean = false): string {

    if (value && !toHours) return `${value}'`

    if (value && toHours) {
      const val = this.calculateHours(value)
      return val
    }
    return ``
  }

  private calculateHours(value: number) {
    console.log(value)
    const hours = Math.floor(value / 60);
    console.log(value)
    const minutes = Math.floor(value % 60);
    return `${hours} h ${minutes}'`;

  }
}
