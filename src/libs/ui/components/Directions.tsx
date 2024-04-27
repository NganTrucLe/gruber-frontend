'use client';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useState, useEffect } from 'react';

import { colors } from '@/libs/ui';

interface DirectionsProps {
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
  mainDirection?: boolean;
}

export function Directions(props: DirectionsProps) {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: props.origin,
        destination: props.destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
        // Customize the polyline
        directionsRenderer.setOptions({
          markerOptions: {
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: 'blue',
              fillOpacity: 0,
              strokeWeight: 0,
            },
          },
          ...(props.mainDirection
            ? {
                polylineOptions: {
                  strokeColor: colors.green[500],
                  strokeOpacity: 1,
                  strokeWeight: 6,
                },
              }
            : {}),
        });
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className='directions'>
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>{route.summary}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
