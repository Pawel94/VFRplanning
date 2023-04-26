import {NgModule} from '@angular/core';

import {DistancePipe} from './pipes/distance.pipe';
import {ErrorValidationMessagesPipe} from './pipes/error-validation-messages.pipe';
import {AsyncPipe} from "@angular/common";
import {TranslocoRootModule} from "../transloco-root.module";


@NgModule({
  declarations: [

    DistancePipe,
    ErrorValidationMessagesPipe
  ],
  exports: [

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
