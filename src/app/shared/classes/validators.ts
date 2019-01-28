import { AbstractControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

export class AppValidators {

  static username(control: AbstractControl): ValidationErrors | null {
    const validator = Validators.compose([
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9@.+-_]{1,150}$/),
      Validators.maxLength(150),
    ]);

    return validator(control);
  }

  static password(control: AbstractControl): ValidationErrors | null {
    const validator = Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-zA-Z]).+$/),
    ]);

    return validator(control);
  }

  static passwordMatch(group: FormGroup): ValidationErrors | null {
    const password1 = group.get('password1');
    const password2 = group.get('password2');

    return (password1 && password2 && password1.value === password2.value) ? null : { passwordMatch: true };
  }

}
