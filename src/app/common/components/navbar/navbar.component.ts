import {Component, OnInit} from '@angular/core';
import {WaypointManagerComponent} from "../../../route/components/waypoint-manager/waypoint-manager.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {WeatherManagerComponent} from "../../../weater/component/weather-manager/weather-manager.component";

@Component({
  selector: 'vfr-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor( public modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  openModal() {
    const modalRef = this.modalService.open(WeatherManagerComponent);
    modalRef.componentInstance.fromParent = ["poznan"];
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });

  }
}
