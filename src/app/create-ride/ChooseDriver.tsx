'use client';
import { Dispatch, SetStateAction } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdvancedMarker } from '@vis.gl/react-google-maps';

import { Alert, Typography } from '@mui/material';

import { ILocationRecord, IRideFromStaff } from '@/libs/interfaces';
import { getOnlineDrivers } from '@/libs/query';
import { formatVehicleType } from '@/libs/utils';

interface OnlineDriver {
  id: string;
  name: string;
  phone: string;
  location: {
    lat: number;
    lng: number;
  };
}

export default function ChooseDriver({
  pickupState,
  destinationState,
  rideState,
}: {
  pickupState: [ILocationRecord | null, Dispatch<SetStateAction<ILocationRecord | null>>];
  destinationState: [ILocationRecord | null, Dispatch<SetStateAction<ILocationRecord | null>>];
  rideState: [IRideFromStaff | null, Dispatch<SetStateAction<IRideFromStaff | null>>];
}) {
  const [pickup] = pickupState;
  const [destination] = destinationState;
  const [ride, setRide] = rideState;
  const { data, status } = useQuery({
    queryKey: ['onlineDrivers'],
    queryFn: getOnlineDrivers,
  });
  if (ride)
    return (
      <div>
        <Typography>
          <b>Điểm đón khách: </b>
          {pickup?.formattedAddress}
        </Typography>
        <Typography>
          <b>Điểm trả khách: </b>
          {destination?.formattedAddress}
        </Typography>
        <Typography>
          <b>Tên khách hàng: </b>
          {ride.name}
        </Typography>
        <Typography>
          <b>Số điện thoại: </b>
          {ride.phone}
        </Typography>
        <Typography>
          <b>Loại xe: </b>
          {formatVehicleType(ride.vehicle_type)}
        </Typography>
        {status === 'success'
          ? data.map((driver: OnlineDriver) => (
              <AdvancedMarker
                key={driver.id}
                position={driver.location}
                onClick={() => setRide((prev) => (prev ? { ...prev, driver_id: driver.id } : null))}
                title='Tài xế'
              />
            ))
          : null}
        {ride.driver_id ? (
          <Typography>
            <b>Mã tài xế: </b>
            {ride.driver_id}
          </Typography>
        ) : (
          <Alert severity='error' sx={{ mt: 2 }}>
            Vui lòng chọn một tài xế
          </Alert>
        )}
      </div>
    );
  else return null;
}
