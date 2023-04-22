import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {Waypoint} from "../../../shared/model/waypoint";

@Component({
  selector: 'vfr-automatic-weather',
  templateUrl: './automatic-weather.component.html',
  styleUrls: ['./automatic-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutomaticWeatherComponent {
  public type: string = "weather-form"
  @Output() dataFromAutomaticForm = new EventEmitter<Waypoint>();


  addNewWeatherPoint($event: Waypoint) {
    this.dataFromAutomaticForm.emit($event);
  }
}
