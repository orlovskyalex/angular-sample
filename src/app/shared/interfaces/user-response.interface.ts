import { UserStatusType } from '../types/user-status.type';

export interface UserResponse {
  id?: string;
  pk?: string;
  username: string;
  status: UserStatusType;
  partner_membership_no?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
}
