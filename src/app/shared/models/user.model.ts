import { get } from 'lodash';
import { UserResponse } from '../interfaces/user-response.interface';
import { UserStatusType } from '../types/user-status.type';

export class User {

  id: string;
  username: string;
  status: UserStatusType;
  membershipNo: number;
  email: string;
  firstName: string;
  lastName: string;

  constructor({ pk, id, username, status, ...other }: UserResponse) {
    this.id = pk || id;
    this.username = username;
    this.status = status;
    this.membershipNo = get(other, 'partner_membership_no', null);
    this.email = get(other, 'email', '');
    this.firstName = get(other, 'first_name', '');
    this.lastName = get(other, 'last_name', '');
  }

}
