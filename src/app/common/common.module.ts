import {NgModule} from '@angular/core';

import {NavbarComponent} from './components/navbar/navbar.component';
import {DegreePipe} from './pipes/degree.pipe';
import {DistancePipe} from './pipes/distance.pipe';
import {ErrorValidationMessagesPipe} from './pipes/error-validation-messages.pipe';
import {AsyncPipe} from "@angular/common";
import {TranslocoRootModule} from "../transloco-root.module";


@NgModule({
  declarations: [
    // NavbarComponent,
    DegreePipe,
    DistancePipe,
    ErrorValidationMessagesPipe
  ],
  exports: [
    // NavbarComponent,
    DegreePipe,
    DistancePipe,
    ErrorValidationMessagesPipe
  ],
  imports: [
    AsyncPipe,
    TranslocoRootModule,

  ]
})
export class CommonModule {
}
