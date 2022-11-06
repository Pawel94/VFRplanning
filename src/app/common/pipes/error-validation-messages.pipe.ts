import {Pipe, PipeTransform} from '@angular/core';
import {ValidationErrors} from "@angular/forms";

@Pipe({
  name: 'errorValidationMessages'
})
export class ErrorValidationMessagesPipe implements PipeTransform {

  transform(errors: ValidationErrors | null): string {
    if (errors) {
      const errorKey: string = Object.keys(errors)[0];
      return validationMessages[errorKey];
    }

    return 'This field is invalid';
  }

}

export const validationMessages: { [key: string]: string } = {
  latAndLatRequaired: 'This fields needs to be completed - missing latitude or longitude',
  airportNotExist: "Airport not exist",
  latitudeIsNotCorrect:"Latitude is not correct",
  longitudeIsNotCorrect:"Longitude is not correct"
};
