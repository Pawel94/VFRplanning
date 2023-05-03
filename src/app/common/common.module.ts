import {NgModule} from '@angular/core';
import {ErrorValidationMessagesPipe} from './pipes/error-pipe/error-validation-messages.pipe';
import {AsyncPipe} from "@angular/common";
import {TranslocoRootModule} from "../transloco-root.module";


@NgModule({
  declarations: [
    ErrorValidationMessagesPipe,

  ],
  exports: [
    ErrorValidationMessagesPipe
  ],
  imports: [
    AsyncPipe,
    TranslocoRootModule,

  ]
})
export class CommonModule {
}
