import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {Waypoint} from "@shared";
import { SearchFormComponent } from '../../../../../shared/components/search-form/search-form.component';

@Component({
    selector: 'vfr-automatic-weather',
    templateUrl: './automatic-weather.component.html',
    styleUrls: ['./automatic-weather.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [SearchFormComponent],
})
export class AutomaticWeatherComponent {
  public type: string = "weather-form"
  @Output() dataFromAutomaticForm = new EventEmitter<Waypoint>();


  addNewWeatherPoint($event: Waypoint) {
    this.dataFromAutomaticForm.emit($event);
  }
}
