import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Weather} from "@features/vfr-parameters";

@Component({
  selector: 'vfr-manual-weather',
  templateUrl: './manual-weather.component.html',
  styleUrls: ['./manual-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManualWeatherComponent {
  @Output() dataFromManualForm = new EventEmitter<Weather>();

  manualWeatherForm: FormGroup = new FormGroup<any>({
    windSpeed: new FormControl<number | null>(0, {}),
    directionOfWind: new FormControl<number | null>(100, {}),
  })


  addManualWeather() {
    this.dataFromManualForm.emit(this.manualWeatherForm.value as Weather)
  }
  get formValueWindSpeed() {
    return this.manualWeatherForm?.get("windSpeed")?.value;
  }

  get formValueDirectionOfWind() {
    return this.manualWeatherForm?.get("directionOfWind")?.value;
  }

}
