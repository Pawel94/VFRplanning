import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslocoModule} from "@ngneat/transloco";
import {FlightParams} from "../../../shared/model/flightParamsModel";
import {Weather} from "../../vfr-parameters/weater/model/indexWeater";
import {PlaneType} from "../../vfr-parameters/flight-parameters/component/model/model";

@Component({
  selector: 'vfr-vfr-summary-panel',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './vfr-summary-panel.component.html',
  styleUrls: ['./vfr-summary-panel.component.scss']
})
export class VfrSummaryPanelComponent {
  @Input() flightParams?: FlightParams;
  @Input() items = ["a,b,c"]
  @Input() planeTypeInformation?:PlaneType;
  @Input() weatherParams?: Weather;
  @Output() openWeatherDialog = new EventEmitter<void>();
  @Output() openFlightParamsDialog = new EventEmitter<void>();


  editWeather(): void {
    this.openWeatherDialog.emit()
  }

  editFlightParams(): void {
    this.openFlightParamsDialog.emit()
  }

}
