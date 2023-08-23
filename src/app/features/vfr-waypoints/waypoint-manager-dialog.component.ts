import {Component, DestroyRef, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'


import {Route, Waypoint} from 'src/app/shared/model/waypoint';
import {RouteService, TriggerService} from "@state";
import {SearchFormComponent} from '../../shared/components/search-form/search-form.component';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";


@Component({
  selector: 'vfr-waypoint-manager',
  templateUrl: './waypoint-manager-dialog.component.html',
  styleUrls: ['./waypoint-manager-dialog.component.scss'],
  standalone: true,
  imports: [SearchFormComponent]
})
export class WaypointManagerDialogComponent implements OnInit {
  @Input() public updateMarker?: Waypoint;


  private actualRoute!: Route;

  constructor(private readonly activeModal: NgbActiveModal,
              private readonly routeService: RouteService,
              private readonly trigger: TriggerService,
              private readonly destroyRef: DestroyRef) {

  }

  ngOnInit(): void {
    this.routeService.selectedRoute$
      .pipe(takeUntilDestroyed(this.destroyRef))
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
    this.trigger.sendEvent({state: true});
    this.closeModal()
  }

}

