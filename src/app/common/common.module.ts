import { NgModule } from '@angular/core';

import { NavbarComponent } from './components/navbar/navbar.component';
import { DegreePipe } from './pipes/degree.pipe';
import { DistancePipe } from './pipes/distance.pipe';



@NgModule({
    declarations: [
        NavbarComponent,
        DegreePipe,
        DistancePipe
    ],
    exports: [
        NavbarComponent,
        DegreePipe,
        DistancePipe
    ],
    imports: [

    ]
})
export class CommonModule { }
