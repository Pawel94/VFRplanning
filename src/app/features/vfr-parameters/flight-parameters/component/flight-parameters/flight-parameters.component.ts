import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlightParamsService} from "@state";
import {Observable, Subject, takeUntil} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {RouteService} from "@state";
import {CommonService} from "../../../../../shared/services";
import {PlaneTypeForSelect} from "../../../types/plane";
import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {TranslocoModule} from '@ngneat/transloco';

@Component({
  selector: 'vfr-flight-parameters',
  templateUrl: './flight-parameters.component.html',
  styleUrls: ['./flight-parameters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    AsyncPipe,
  ],
})
export class FlightParametersComponent implements OnInit, OnDestroy {


  planesFromDateBase$: Observable<PlaneTypeForSelect[]> = this.dateBase.getPlanesFromDB();
  private unsubscribe$ = new Subject<void>;

  flightPramsForm: FormGroup = new FormGroup<any>({
    planeVelocity: new FormControl<number | null>(0, {}),
    flightLevel: new FormControl<number | null>(1000, {}),
    planeFuel: new FormControl<number | null>(1000, {}),
    planeTypeId: new FormControl<PlaneTypeForSelect>({id: 1, name: ""})
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
      .subscribe(params => {
        this.flightPramsForm.setValue({
          planeVelocity: params.planeVelocity,
          flightLevel: params.flightLevel,
          planeFuel: params.planeFuel,
          planeTypeId: params.planeTypeId
        })
      })


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
