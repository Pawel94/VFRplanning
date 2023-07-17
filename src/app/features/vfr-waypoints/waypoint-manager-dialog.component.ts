import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'
import {Subject, takeUntil} from "rxjs";

import {Route, Waypoint} from 'src/app/shared/model/waypoint';
import {RouteService, TriggerService} from "@state";
import { SearchFormComponent } from '../../shared/components/search-form/search-form.component';


@Component({
    selector: 'vfr-waypoint-manager',
    templateUrl: './waypoint-manager-dialog.component.html',
    styleUrls: ['./waypoint-manager-dialog.component.scss'],
    standalone: true,
    imports: [SearchFormComponent]
})
export class WaypointManagerDialogComponent implements OnInit, OnDestroy {
  @Input() public updateMarker?: Waypoint;


  private actualRoute!: Route;
  private unsubscribeSignal: Subject<void> = new Subject();

  constructor(private readonly activeModal: NgbActiveModal,
              private readonly routeService: RouteService,
              private readonly trigger:TriggerService) {

  }

  ngOnInit(): void {
    this.routeService.selectedRoute$
      .pipe(
        takeUntil(this.unsubscribeSignal.asObservable()))
      .subscribe(route =>
        this.actualRoute = route
      );
  }

  public closeModal(): void {
    this.activeModal.close('Modal Closed');
  }


  public editOrAddNewWaypoint(waypointToAdd: Waypoint): void {
    const listOfWaypoints = [...this.actualRoute.listOfWaypoints]
    const index = listOfWaypoints.findIndex(obj => obj.id === waypointToAdd.id);
    if (index === -1) {
      listOfWaypoints.push(waypointToAdd);
    } else {
      listOfWaypoints[index] = waypointToAdd;
    }

    this.actualRoute.listOfWaypoints = [...listOfWaypoints]
    this.routeService.setRoute({...this.actualRoute});
    this.trigger.sendEvent({state:true});
    this.closeModal()
  }

  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }

}

