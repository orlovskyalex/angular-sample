import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserStatusType } from '../types/user-status.type';

@Injectable({
  providedIn: 'root',
})
export class RouterService {

  constructor(private router: Router) {
  }

  navigateUserByStatus(status: UserStatusType): Promise<boolean> {
    return this.router.navigate(['/', (status === 'staff') ? 'admin' : status]);
  }

  reload(): Promise<boolean> {
    return this.router.navigate([this.router.url]);
  }

}
