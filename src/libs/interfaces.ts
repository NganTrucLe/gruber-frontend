import { VehicleType } from './enum';

export interface ILocationRecord {
  id?: string;
  name?: string;
  formattedAddress: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface IRideFromStaff {
  name: string;
  phone: string;
  vehicle_type: VehicleType;
  booking_route: {
    pick_up?: string;
    destination?: string;
  };
  driver_id?: string;
}
