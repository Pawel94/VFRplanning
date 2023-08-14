import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslocoModule} from "@ngneat/transloco";
import {FlightParams, Route} from "@shared";
import {PlaneType, Weather} from "@features/vfr-parameters";
import {AuthService} from "../../../shared/services";
import {Observable} from "rxjs";
import {RouterLink} from "@angular/router";
import {MaxHoursPipe} from "@shared";
import {TimePipe} from "@shared";

@Component({
  selector: 'vfr-vfr-summary-panel',
  standalone: true,
  imports: [CommonModule, TranslocoModule, RouterLink, MaxHoursPipe, TimePipe],
  templateUrl: './vfr-summary-panel.component.html',
  styleUrls: ['./vfr-summary-panel.component.scss']
})
export class VfrSummaryPanelComponent {
  @Input() flightParams?: FlightParams;
  @Input() planeTypeInformation?: PlaneType;
  @Input() routeInformation?: Route;
  @Input() weatherParams?: Weather;
  @Output() openWeatherDialog = new EventEmitter<void>();
  @Output() openFlightParamsDialog = new EventEmitter<void>();
  @Output() triggerGeneratePDF: EventEmitter<void> = new EventEmitter<void>();
  userState: Observable<any> = this.auth.authState$;

  constructor(private readonly auth: AuthService) {
  }

  public editWeather(): void {
    this.openWeatherDialog.emit()
  }

  public editFlightParams(): void {
    this.openFlightParamsDialog.emit()
  }

  public openPDF(): void {
    this.triggerGeneratePDF.emit()
  }
}
