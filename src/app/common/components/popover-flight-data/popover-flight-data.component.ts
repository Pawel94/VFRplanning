import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from "rxjs";
import {Route} from "@shared";
import {RouteService} from "../../../shared/services/state";
import {TranslocoModule} from "@ngneat/transloco";
import {AsyncPipe, NgIf} from "@angular/common";


@Component({
  selector: 'vfr-popover-flight-data',
  templateUrl: './popover-flight-data.component.html',
  styleUrls: ['./popover-flight-data.component.scss'],
  imports: [
    TranslocoModule,
    AsyncPipe,
    NgIf
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverFlightDataComponent {
  route$: Observable<Route> = this.routeService.selectedRoute$;

  constructor(private readonly routeService: RouteService,
  ) {

  }
}
