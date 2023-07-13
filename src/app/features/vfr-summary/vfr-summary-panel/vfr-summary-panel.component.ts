import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslocoModule} from "@ngneat/transloco";
import {FlightParams} from "@shared";
import {Weather} from "@features/vfr-parameters";
import {PlaneType} from "@features/vfr-parameters";
import {AuthService} from "../../../common/services/auth/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'vfr-vfr-summary-panel',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './vfr-summary-panel.component.html',
  styleUrls: ['./vfr-summary-panel.component.scss']
})
export class VfrSummaryPanelComponent {
  @Input() flightParams?: FlightParams;
  @Input() planeTypeInformation?: PlaneType;
  @Input() weatherParams?: Weather;
  @Output() openWeatherDialog = new EventEmitter<void>();
  @Output() openFlightParamsDialog = new EventEmitter<void>();
  userState: Observable<any> = this.auth.authState$;

  constructor(private readonly auth: AuthService) {
  }

  editWeather(): void {
    this.openWeatherDialog.emit()
  }

  editFlightParams(): void {
    this.openFlightParamsDialog.emit()
  }

}
