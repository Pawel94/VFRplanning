import {ChangeDetectionStrategy, Component, DestroyRef, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlightParamsService, RouteService} from "@state";
import {Observable} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CommonService} from "../../../../../shared/services";
import {PlaneTypeForSelect} from "../../../types/plane";
import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {TranslocoModule} from '@ngneat/transloco';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

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
export class FlightParametersComponent implements OnInit {

  planesFromDateBase$: Observable<PlaneTypeForSelect[]> = this.dateBase.getPlanesFromDB();


  flightPramsForm: FormGroup = new FormGroup<any>({
    planeVelocity: new FormControl<number | null>(0, {}),
    flightLevel: new FormControl<number | null>(1000, {}),
    planeFuel: new FormControl<number | null>(1000, {}),
    planeTypeId: new FormControl<PlaneTypeForSelect>({id: 1, name: ""})
  })

  constructor(private readonly flightParams: FlightParamsService,
              private readonly roteService: RouteService,
              private readonly activeModal: NgbActiveModal,
              private readonly dateBase: CommonService,
              private readonly destroyRef: DestroyRef
  ) {

  }

  ngOnInit(): void {
    this.flightParams.selectFlightParams$
      .pipe(takeUntilDestroyed(this.destroyRef))
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
}
