'use client';
import { AdvancedMarker } from '@vis.gl/react-google-maps';

import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
interface MarkerProps {
  position:
    | {
        lat: number;
        lng: number;
      }
    | google.maps.LatLng;
  type: 'pickup' | 'destination';
  role: 'driver' | 'passenger';
}

export function Marker({ position, type }: MarkerProps) {
  return (
    <AdvancedMarker position={position} title={type == 'pickup' ? 'Điểm đón' : 'Điểm đến'}>
      <PlaceRoundedIcon
        color={type == 'pickup' ? 'primary' : 'error'}
        fontSize='large'
        sx={{ width: '3rem', height: '3rem' }}
      />
    </AdvancedMarker>
  );
}
