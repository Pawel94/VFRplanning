import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Waypoint} from "@shared";
import {SearchFormComponent} from "../../shared/components/search-form/search-form.component";

@Component({
  selector: 'vfr-vfr-airports',
  standalone: true,
  imports: [CommonModule, SearchFormComponent],
  templateUrl: './vfr-airports.component.html',
  styleUrls: ['./vfr-airports.component.scss']
})
export class VfrAirportsComponent {

  addNewWeatherPoint($event: Waypoint) {

  }

  closeModal() {

  }
}
