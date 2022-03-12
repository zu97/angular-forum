import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function identicalValidator(fields: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let isSomeoneFilled = false;

    fields.forEach((field) => {
      const value = control.get(field)?.value;
      const isFieldFilled = !!value;

      if (isFieldFilled) {
        isSomeoneFilled = true;
      }
    });

    fields.forEach((field) => {
      const getField = control.get(field);
      let fieldErrors: ValidationErrors | null = getField?.errors || {};

      if (isSomeoneFilled) {
        delete fieldErrors['filled'];
      } else {
        fieldErrors['filled'] = true;
      }

      if (Object.keys(fieldErrors).length === 0) {
        fieldErrors = null;
      }

      getField?.setErrors(fieldErrors);
    });

    if (isSomeoneFilled) {
      return null;
    }

    return {filled: true};
  };
}

@Directive({
  selector: '[appFilled]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidateSomeoneFilledDirective,
    multi: true
  }]
})
export class ValidateSomeoneFilledDirective implements Validator {
  @Input('appFilled') filledFields: string[] = [];

  validate(control: AbstractControl): ValidationErrors | null {
    return identicalValidator(this.filledFields)(control);
  }

}
