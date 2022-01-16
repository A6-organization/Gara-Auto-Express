export enum UserStatus {
  INITIAL = 'INITIAL',
  ACTIVE = 'ACTIVE',
  ONHOLD = 'ON-HOLD',
  SUSPEND = 'SUSPEND',
  INACTIVE = 'IN-ACTIVE',
}

export enum UserRoles {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
  EXPERT = 'EXPERT',
  SALE = 'SALE',
}

export interface SignUpBody {
  email: string;
  password: string;
  roles?: string;
}

export interface SignInBody extends Omit<SignUpBody, 'roles'> {
  email: string;
  password: string;
}

export enum TokenType {
  ACCESS = 'Access',
  REFRESH = 'Refresh',
}
