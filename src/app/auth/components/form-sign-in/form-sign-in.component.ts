import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AppValidators } from '../../../shared/classes/validators';

import { AuthService } from '../../../shared/services/auth.service';
import { FormErrorService } from '../../../shared/services/form-error.service';
import { HttpErrorService } from '../../../shared/services/http-error.service';
import { UserStatusType } from '../../../shared/types/user-status.type';

@Component({
  selector: 'app-form-sign-in',
  templateUrl: './form-sign-in.component.html',
  styleUrls: ['./form-sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSignInComponent implements OnInit, OnChanges {

  @Input() status: UserStatusType;

  @Output() signedIn = new EventEmitter<UserStatusType>();

  form: FormGroup;
  getFirstControlError = this.formErrorService.getFirstControlError;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private cd: ChangeDetectorRef,
    private httpError: HttpErrorService,
    private formErrorService: FormErrorService,
  ) {
  }

  ngOnInit() {
    this.form = this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('status' in changes && this.form) {
      this.form.get('status').setValue(changes.status.currentValue);
    }
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.auth.signIn(this.form.value)
      .pipe(
        finalize(() => {
          this.cd.detectChanges();
        }),
      )
      .subscribe(
        () => this.signedIn.emit(this.status),
        this.httpError.setFormErrors(this.form),
      );
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      username: ['', AppValidators.username],
      password: ['', AppValidators.password],
      status: [this.status, Validators.required],
    });
  }

}
