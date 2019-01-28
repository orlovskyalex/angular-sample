import { Component } from '@angular/core';

import { RouterService } from '../../../shared/services/router.service';
import { UserStatusType } from '../../../shared/types/user-status.type';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {

  constructor(private router: RouterService) {
  }

  onSuccess(status: UserStatusType): void {
    this.router.navigateUserByStatus(status);
  }

}
