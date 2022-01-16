import { UserRoles, UserStatus } from '../../modules/auth/types/auth';

export interface UsersAttributes {
  id: number;
  password: string;
  roles: UserRoles | string;
  status: UserStatus | string;
  email: string;
  created_at: Date;
  recent_login_time: Date;
}

export interface UsersCreation extends Omit<UsersAttributes, 'id'> {
  password: string;
  roles: UserRoles | string;
  status: UserStatus | string;
  email: string;
  created_at: Date;
  recent_login_time: Date;
}

export interface LoginTokenAttributes {
  id: number;
  token: string;
  user_id: number;
  created_at: Date;
}
export interface LoginTokenCreation extends Omit<LoginTokenAttributes, 'id'> {
  token: string;
  user_id: number;
  created_at: Date;
}
