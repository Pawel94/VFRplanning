import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {Weather} from "@features/vfr-parameters";
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'vfr-manual-weather',
    templateUrl: './manual-weather.component.html',
    styleUrls: ['./manual-weather.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        TranslocoModule,
        FormsModule,
        ReactiveFormsModule,
    ],
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
