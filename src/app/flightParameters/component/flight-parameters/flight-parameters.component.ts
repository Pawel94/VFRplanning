import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {FlightParamsService} from "../../../shared/services/flight-params.service";
import {FlightParams} from "../../../shared/model/flightParamsModel";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'vfr-flight-parameters',
  templateUrl: './flight-parameters.component.html',
  styleUrls: ['./flight-parameters.component.scss']
})
export class FlightParametersComponent implements OnInit {

  private flightParamsData!: FlightParams
  flightPramsForm: FormGroup = new FormGroup<any>({
    planeVelocity: new FormControl<number | null>(0, {}),
    flightLevel: new FormControl<number | null>(1000, {})
  })

  constructor(private readonly flightParams: FlightParamsService,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.flightParams.selectFlightParams$.subscribe(params => this.flightParamsData = params)
    console.log(this.flightParamsData)
    this.flightPramsForm?.get("planeVelocity")?.setValue(this.flightParamsData.planeVelocity)
    this.flightPramsForm?.get("flightLevel")?.setValue(this.flightParamsData.flightLevel)
  }

  closeModal() {

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
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
