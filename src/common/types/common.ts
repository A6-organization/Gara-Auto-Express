import { JwtPayload } from 'jsonwebtoken';
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

export type UsersCreation = Omit<UsersAttributes, 'id'>;

export interface LoginTokenAttributes {
  id: number;
  token: string;
  user_id: number;
  created_at: Date;
}

export type LoginTokenCreation = Omit<LoginTokenAttributes, 'id'>;

export interface LoginAttemptsAttributes {
  id: number;
  user_id: number;
  attempts: number;
  start_time: Date;
  end_time: Date;
}

export type LoginAttemptsCreation = Omit<LoginAttemptsAttributes, 'id'>;

export enum TimeZone {
  ASIA_HCM = 'Asia/Ho_Chi_Minh',
}

export enum EmailStatus {
  SENT = 'SENT',
  VERIFY = 'VERIFY',
  UNKNOWN = 'UNKNOWN',
}
export interface EmailReminderAttributes {
  id: number;
  user_id: number;
  email_status: EmailStatus;
  last_send_time: Date;
}

export type EmailReminderCreation = Omit<EmailReminderAttributes, 'id'>;

export interface ErrorRecorderAttributes {
  id: number;
  destination: string;
  reason: string;
  created_at: Date;
}

export type ErrorRecorderCreation = Omit<ErrorRecorderAttributes, 'id'>;

export type ExitedField<E> = {
  [Property in keyof E]: E[Property];
};

export type AdditionalField<A> = {
  [Property in keyof A]: A[Property];
};

export type JoinedQueryType<E, A> = ExitedField<Partial<E>> &
  AdditionalField<A>;

export interface AttemptsIncludeAttributes {
  attempts: LoginAttemptsAttributes;
}

export type UserIncludeLoginAttempts = JoinedQueryType<
  UsersAttributes,
  AttemptsIncludeAttributes
>;

export interface TokenDecode extends JwtPayload {
  type?: string;
  user?: string;
}
