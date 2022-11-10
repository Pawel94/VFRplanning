import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {WeatherManagerComponent} from "../../../weater/component/weather-manager/weather-manager.component";
import {CommonService} from "../../services/common.service";

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

  openModal() {
    const modalRef = this.modalService.open(WeatherManagerComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });

  }
}
