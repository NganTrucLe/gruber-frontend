export type PaymentMethod = 'cash' | 'card';
export type Vehicle = 'motorbike' | 'car4' | 'car7';
export type RoleType = 'staff' | 'driver' | 'passenger' | 'admin';

export enum BookingStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  PICKED_UP = 'picked_up',
  IN_PROGRESS = 'in_progress',
  ARRIVED = 'arrived',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum VehicleType {
  MOTORBIKE = 'motorbike',
  CAR4 = 'car4',
  CAR7 = 'car7',
}

export enum Role {
  STAFF = 'staff',
  DRIVER = 'driver',
  PASSENGER = 'passenger',
  ADMIN = 'admin',
}

export enum StatusCode {
  SUCCESS = 200,
  BADREQUEST = 400,
  NOTFOUND = 404,
}
