import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'
import {MapService} from "../../../map/services/map.service";
import {Airport} from "../../../map/model/modelForMaps";
import {debounceTime, distinctUntilChanged, map, Observable, tap} from "rxjs";

@Component({
  selector: 'vfr-waypoint-manager',
  templateUrl: './waypoint-manager.component.html',
  styleUrls: ['./waypoint-manager.component.scss']
})
export class WaypointManagerComponent implements OnInit {
  searchedOptions: Airport[] = [];
  public model: any;

  constructor(private activeModal: NgbActiveModal, private readonly mapService: MapService) {
  }

  search: (text$: Observable<string>) => Observable<string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : this.searchedOptions.filter((v) => v.city.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
      ),
      map(x => x.map(x =>x.city)),
    );


  ngOnInit(): void {
    this.mapService.findAirPortsFrom("null").subscribe(x => {
      this.searchedOptions = x;
      console.log(this.searchedOptions)
    });
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }


}
