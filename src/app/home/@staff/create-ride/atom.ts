import { atom } from 'recoil';

export interface PlaceOptionType {
  formatted_address: string;
  id?: number;
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export interface FullRide {
  name: string;
  phone: string;
  vehicle_type: string;
  booking_route: {
    pick_up: number;
    destination: number;
  };
  driver_id?: number;
}

export const pickupState = atom<PlaceOptionType | null>({
  key: 'pickupState',
  default: null,
});

export const destinationState = atom<PlaceOptionType | null>({
  key: 'destinationState',
  default: null,
});

export const fullRideState = atom<FullRide | null>({
  key: 'fullRideState',
  default: null,
});
