import {Component, OnInit} from '@angular/core';
import {WaypointManagerComponent} from "../../../route/components/waypoint-manager/waypoint-manager.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {WeatherManagerComponent} from "../../../weater/component/weather-manager/weather-manager.component";
import {takeUntil} from "rxjs";
import {CommonService} from "../../services/common.service";
import {Airport} from "../../../map/model/modelForMaps";

@Component({
  selector: 'vfr-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private searchedOptions?: Airport[];

  constructor( public modalService: NgbModal, public readonly common:CommonService) {
  }

  ngOnInit(): void {

    this.common.getCitiesFromDB()
        // takeUntil(this.unsubscribeSignal.asObservable()))
      .subscribe(element => {
        this.searchedOptions = element;
      });
  }

  openModal() {
    const modalRef = this.modalService.open(WeatherManagerComponent);
    modalRef.componentInstance.fromParent = this.searchedOptions;
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });

  }
}
