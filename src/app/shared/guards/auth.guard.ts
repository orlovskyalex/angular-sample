import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.auth.token$
      .pipe(
        filter(token => token !== undefined),
        map((token) => {
          if (!token) {
            this.router.navigate(['/auth/login']);

            return false;
          }

          return true;
        }),
      );
  }

}
