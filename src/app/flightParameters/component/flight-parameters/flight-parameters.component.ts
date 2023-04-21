import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {FlightParamsService} from "../../../shared/services/flight-params.service";
import {FlightParams} from "../../../shared/model/flightParamsModel";
import {ToastrService} from "ngx-toastr";
import {Subject, takeUntil} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'vfr-flight-parameters',
  templateUrl: './flight-parameters.component.html',
  styleUrls: ['./flight-parameters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightParametersComponent implements OnInit, OnDestroy {

  private flightParamsData!: FlightParams
  private unsubscribe$ = new Subject<void>;

  flightPramsForm: FormGroup = new FormGroup<any>({
    planeVelocity: new FormControl<number | null>(0, {}),
    flightLevel: new FormControl<number | null>(1000, {})
  })

  constructor(private readonly flightParams: FlightParamsService,
              private readonly notification: ToastrService,
              private readonly activeModal: NgbActiveModal,
              private readonly transloco: TranslocoService) {

  }

  ngOnInit(): void {
    this.flightParams.selectFlightParams$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => this.flightParamsData = params)

    this.flightPramsForm?.get("planeVelocity")?.setValue(this.flightParamsData.planeVelocity)
    this.flightPramsForm?.get("flightLevel")?.setValue(this.flightParamsData.flightLevel)
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  get formValueVelocity() {
    return this.flightPramsForm?.get("planeVelocity")?.value;
  }

  get formValueFlightLevel() {
    return this.flightPramsForm?.get("flightLevel")?.value;
  }

  submitFlightParamsForm() {
    const params = this.flightPramsForm?.value
    this.flightParams.setParams(params)
    if (this.flightPramsForm) {
      this.notification.success(this.transloco.translate(
        'flightParameters.params', {...params}
      ), this.transloco.translate(
        'flightParameters.success'
      ),);
      this.closeModal()
    } else {
      this.notification.error(this.transloco.translate(
        'flightParameters.error'
      ),);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
