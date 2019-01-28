import { AfterViewInit, ChangeDetectorRef, ContentChild, Directive } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective, ValidationErrors } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { get } from 'lodash';

@Directive({
  selector: 'mat-form-field', // tslint:disable-line directive-selector
})
export class FormFieldRequiredDirective implements AfterViewInit {

  @ContentChild(MatFormFieldControl) fieldControl: CustomMatFormFieldControl<any>;

  private get isReactiveForm(): boolean {
    const fieldControlDirective = get(this.fieldControl, 'ngControl.formDirective', null);
    return fieldControlDirective instanceof FormGroupDirective;
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    // this directive designed to work with reactive forms
    if (!this.isReactiveForm) {
      return;
    }

    this.checkControl();
    this.changeDetectorRef.detectChanges();
  }

  private checkControl() {
    this.fieldControl.required = this.isRequired(this.fieldControl.ngControl.control);
  }

  private isRequired(control: AbstractControl): boolean {
    if (!control.validator) {
      return false;
    }

    const errors: ValidationErrors = control.validator(new FormControl());

    if (!errors) {
      return false;
    }

    return !!errors.required;
  }

}

export abstract class CustomMatFormFieldControl<T> extends MatFormFieldControl<T> {
  required: boolean;
}
