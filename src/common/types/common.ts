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

export interface BrandAttributes {
  id: number;
  name: string;
  descriptions: string;
}

export type BrandCreation = Omit<BrandAttributes, 'id'>;
export type BrandModifying = Omit<BrandCreation, 'name'>;
export interface UserCarRatingAttributes {
  id: number;
  carId: number;
  userId: number;
  ratingPoint: string;
}

export type UserCarRatingCreation = Omit<UserCarRatingAttributes, 'id'>;

export interface CarAppearanceAttributes {
  id: number;
  car_id: number;
  imgs: string;
  introImgs: string;
  exteriorReviewImgs: string;
  interiorReviewImgs: string;
  newImgs: string;
  newIntroImgs: string;
  newExteriorReviewImgs: string;
  newInteriorReviewImgs: string;
}

export type CarAppearanceCreation = Omit<CarAppearanceAttributes, 'id'>;

export interface CarAttributes {
  id: number;
  brandId: number;
  name: string;
  price: string;
  discountPercent: number;
  design: string;
  engine: string;
  gear: string;
  seats: number;
  capacity: string;
  yearOfManufacture: number;
  introReview: string;
  exteriorReview: string;
  interiorReview: string;
  amenityReview: string;
  safetyReview: string;
}

export type CarCreation = Omit<CarAttributes, 'id'>;

export interface ClientCouponAttributes {
  id: number;
  client_id: number;
  coupon_id: number;
  car_id: number;
  used_at: Date;
}

export type ClientCouponCreation = Omit<ClientCouponAttributes, 'id'>;
export interface CouponAttributes {
  id: number;
  code: string;
  description: string;
  amount: number;
}

export type CouponCreation = Omit<CouponAttributes, 'id'>;
export interface PaymentMethodAttributes {
  id: number;
  method: string;
}

export type PaymentMethodCreation = Omit<PaymentMethodAttributes, 'id'>;
export interface PaymentProviderAttributes {
  id: number;
  provider: string;
}

export type PaymentProviderCreation = Omit<PaymentProviderAttributes, 'id'>;
export interface WishListAttributes {
  id: number;
  client_id: number;
  car_id: number;
}

export type WishListCreation = Omit<WishListAttributes, 'id'>;

export interface ClientAttributes {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  gender: string;
  phone_number: string;
  dob: Date;
  address_country: string;
  address_province: number;
  address_district: number;
  address_ward: number;
  address_detail: string;
  timezone: string;
  stripe_customer_id: string;
}

export type ClientCreation = Omit<ClientAttributes, 'id'>;

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
