'use client';
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

import Typography from '@mui/material/Typography';

import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';

import { colors } from '@/libs/ui';
interface MarkerProps {
  position:
    | {
        lat: number;
        lng: number;
      }
    | google.maps.LatLng;
  type?: 'pickup' | 'destination';
  role?: 'driver' | 'passenger';
}

export function Marker({ position, type = 'pickup', role = 'passenger' }: MarkerProps) {
  return (
    <AdvancedMarker position={position} title={type == 'pickup' ? 'Điểm đón' : 'Điểm đến'}>
      {role == 'driver' ? (
        <Pin
          background={type == 'pickup' ? colors.green[500] : colors.notification.error}
          glyphColor='white'
          borderColor={type == 'pickup' ? colors.green[600] : colors.notification.error}
          scale={1.5}>
          <Typography variant='h6'>{type == 'pickup' ? 1 : 2}</Typography>
        </Pin>
      ) : (
        <PlaceRoundedIcon
          color={type == 'pickup' ? 'primary' : 'error'}
          fontSize='large'
          sx={{ width: '3rem', height: '3rem' }}
        />
      )}
    </AdvancedMarker>
  );
}
