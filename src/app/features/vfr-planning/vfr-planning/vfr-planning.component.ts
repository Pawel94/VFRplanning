import {Component} from '@angular/core';
import { MapComponent } from '../map/components/map.component';
import { RouteContainerComponent } from '../route/components/route-container/route-container.component';

@Component({
    selector: 'vfr-vfr-planning',
    templateUrl: './vfr-planning.component.html',
    styleUrls: ['./vfr-planning.component.scss'],
    standalone: true,
    imports: [RouteContainerComponent, MapComponent]
})
export class VfrPlanningComponent {

}
