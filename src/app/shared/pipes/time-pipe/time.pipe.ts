import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {

  transform(value?: number, toHours: boolean = false): string {

    if (value) return `${value}'`

    if (value && toHours) {
      const val = this.calculateHours(value)
      return val
    }
    return ``
  }

  private calculateHours(value: number) {
    const hours = Math.floor(value / 60);
    const minutes = Math.floor(value % 60);
    return `${hours} h ${minutes}'`;

  }
}
