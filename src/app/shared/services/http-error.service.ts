import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, throwError, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { GenericRetryStrategyOptions } from '../interfaces/generic-retry-strategy-options.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {

  genericRetryStrategy({
    maxRetryAttempts = 3,
    scalingDuration = 1000,
    excludedStatusCodes = [404],
    log = !environment.production,
  }: GenericRetryStrategyOptions = {}) {
    return (attempts: Observable<any>) => {
      return attempts.pipe(
        mergeMap((error, i) => {
          const retryAttempt = i + 1;

          const tooManyRetries = retryAttempt > maxRetryAttempts;
          const statusCodeExcluded = excludedStatusCodes.find(e => e === error.status);

          if (tooManyRetries || statusCodeExcluded) {
            return throwError(error);
          }

          if (log) {
            console.log(`Attempt ${ retryAttempt }: retrying in ${ retryAttempt * scalingDuration }ms`);
          }

          return timer(retryAttempt * scalingDuration);
        }),
      );
    };
  }

  setFormErrors(form: FormGroup) {
    return (error: HttpErrorResponse) => {
      Object.entries(error.error).forEach(([key, value]) => {
        if (key === 'non_field_errors') {
          form.setErrors({ non_field_errors: value[0] });
          return;
        }

        const control = form.get(key);

        if (control) {
          control.setErrors({ [key]: value[0] });
        }
      });
    };
  }

}
