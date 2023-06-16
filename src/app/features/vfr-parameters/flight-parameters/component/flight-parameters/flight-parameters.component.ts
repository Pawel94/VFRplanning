import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {FlightParamsService} from "../../../../../shared/services/state/flight-state/flight-params.service";
import {FlightParams} from "../../../../../shared/model/flightParamsModel";
import {Observable, Subject, takeUntil} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {RouteService} from "../../../../../shared/services/state/route-state/route.service";
import {CommonService} from "../../../../../common/services/communication/firebase-communication/common.service";
import {PlaneTypeForSelect} from "../../../types/plane";

@Component({
  selector: 'vfr-flight-parameters',
  templateUrl: './flight-parameters.component.html',
  styleUrls: ['./flight-parameters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightParametersComponent implements OnInit, OnDestroy {


  planesFromDateBase$: Observable<PlaneTypeForSelect[]> = this.dateBase.getPlanesFromDB();
  private flightParamsData!: FlightParams
  private unsubscribe$ = new Subject<void>;

  flightPramsForm: FormGroup = new FormGroup<any>({
    planeVelocity: new FormControl<number | null>(0, {}),
    flightLevel: new FormControl<number | null>(1000, {}),
    planeFuel: new FormControl<number | null>(1000, {}),
    planeType: new FormControl<PlaneTypeForSelect>({id: 1, name: ""})
  })

  constructor(private readonly flightParams: FlightParamsService,
              private readonly roteService: RouteService,
              private readonly activeModal: NgbActiveModal,
              public readonly dateBase: CommonService
  ) {

  }

  ngOnInit(): void {
    this.flightParams.selectFlightParams$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => this.flightParamsData = params)

    this.flightPramsForm?.get("planeVelocity")?.setValue(this.flightParamsData.planeVelocity)
    this.flightPramsForm?.get("flightLevel")?.setValue(this.flightParamsData.flightLevel)
    this.flightPramsForm?.get("planeFuel")?.setValue(this.flightParamsData.planeFuel)
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

  get formValuePlaneFuel() {
    return this.flightPramsForm?.get("planeFuel")?.value;
  }

  submitFlightParamsForm() {
    const params = this.flightPramsForm?.value
    this.flightParams.setParams(params)
    this.roteService.setVelocity(params.planeVelocity)
    this.closeModal()
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
