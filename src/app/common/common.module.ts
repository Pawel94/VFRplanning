import {NgModule} from '@angular/core';
import {DegreePipe} from './pipes/degree.pipe';
import {DistancePipe} from './pipes/distance.pipe';
import {ErrorValidationMessagesPipe} from './pipes/error-validation-messages.pipe';
import {AsyncPipe} from "@angular/common";
import {TranslocoRootModule} from "../transloco-root.module";


@NgModule({
  declarations: [
    DegreePipe,
    DistancePipe,
    ErrorValidationMessagesPipe
  ],
  exports: [
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
