'use client';
import { useQuery } from '@tanstack/react-query';
import { AdvancedMarker } from '@vis.gl/react-google-maps';

import { getOnlineDrivers } from '@/libs/query';

interface OnlineDriver {
  id: string;
  name: string;
  phone: string;
  location: {
    lat: number;
    lng: number;
  };
}

export default function ChooseDriver({ onSelectDriver }: { onSelectDriver: (driverId: string) => void }) {
  const { data, status } = useQuery({
    queryKey: ['onlineDrivers'],
    queryFn: getOnlineDrivers,
  });
  return (
    <div>
      {status === 'success'
        ? data.map((driver: OnlineDriver) => (
            <AdvancedMarker
              key={driver.id}
              position={driver.location}
              onClick={() => onSelectDriver(driver.id)}
              title='Tài xế'
            />
          ))
        : null}
    </div>
  );
}
