export type Role = 'user' | 'driver' | 'admin' | 'staff';
export type PaymentMethod = 'cash' | 'card';
export type Vehicle = 'motorbike' | 'car4' | 'car7';

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
