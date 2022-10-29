import { NgModule } from '@angular/core';

import { NavbarComponent } from './components/navbar/navbar.component';
import { DegreePipe } from './pipes/degree.pipe';



@NgModule({
    declarations: [
        NavbarComponent,
        DegreePipe
    ],
    exports: [
        NavbarComponent,
        DegreePipe
    ],
    imports: [

    ]
})
export class CommonModule { }
