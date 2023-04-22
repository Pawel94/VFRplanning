import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {WeatherManagerComponent} from "../../../weater/component/weather-manager/weather-manager.component";
import {CommonService} from "../../services/communication/firebase-communication/common.service";
import {
  FlightParametersComponent
} from "../../../flightParameters/component/flight-parameters/flight-parameters.component";

@Component({
  selector: 'vfr-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public modalService: NgbModal, public readonly common: CommonService) {
  }

  ngOnInit(): void {
  }

  openWeatherModal(){
    this.openModal(WeatherManagerComponent)
  }
  openFlightParameterModal(){
    this.openModal(FlightParametersComponent)
  }

  openModal(service:any) {
    const modalRef = this.modalService.open(service);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });

  }
}
