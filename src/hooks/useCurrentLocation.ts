import React from 'react';

import { Position } from '@/interfaces';

/**
 * Hook to get current location of user, if user denied permission, the default location is HCMUS
 * @return The current location of user
 * @example
 * const position = useCurrentLocation();
 * console.log(position);
 * // Output: { lat: 10.762838024314062, lng: 106.68248463223016 }
 * @example
 * // To use this hook, you need to import it into a component
 * import { useCurrentLocation } from '@/hooks';
 * // Then, call the hook in the component
 * const position = useCurrentLocation();
 * console.log(position);
 * // Output: { lat: 10.762838024314062, lng: 106.68248463223016 }
 */

export default function useCurrentLocation() {
  const defaultPosition: Position = {
    lat: 10.762838024314062,
    lng: 106.68248463223016,
  };
  const [position, setPosition] = React.useState<Position>(defaultPosition);

  React.useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        // If user denied permission, current location is at HCMUS
        setPosition(defaultPosition);
      },
      {
        // This options means that useCurrentPosition will wait for 5s before timeout
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, []);
  return position;
}
