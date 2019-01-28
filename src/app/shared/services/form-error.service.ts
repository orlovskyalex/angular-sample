import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormErrorService {

  static formErrorsMap = {
    username: {
      pattern: 'Doesn\'t match the required format',
      maxlength: 'Must contain at most 150 characters',
    },
    password1: {
      minlength: 'Must contain at least 8 characters',
      pattern: 'Can\'t be entirely numeric',
    },
    password2: {
      passwordMatch: 'Passwords don\'t match',
    },
  };

  constructor() {
  }

  getFirstControlError = (form: FormGroup, path: string, controlKey = path): string => {
    const { errors } = path ? form.get(path) : form;

    if (!errors) {
      return;
    }

    const errorKey = Object.keys(errors)[0];
    const error = FormErrorService.formErrorsMap[controlKey][errorKey] || errors[errorKey];

    return (typeof error === 'string') ? error : error[0];
  };

}
