'use client';
import { Dispatch, SetStateAction } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';

import { Alert, Typography } from '@mui/material';

import { ILocationRecord, IRideFromStaff } from '@/libs/interfaces';

const onlineDriver = [
  {
    id: 'd136f5a1-dbc7-476d-a28a-3bb4817c4022',
    location: {
      lat: 10.764622,
      lng: 106.650172,
    },
  },
  {
    id: 'd136f5a1-dbc7-476d-a28a-3bb4817c4022',
    location: {
      lat: 10.704722,
      lng: 106.64,
    },
  },
  {
    id: 'd136f5a1-dbc7-476d-a28a-3bb4817c4022',
    location: {
      lat: 10.674822,
      lng: 106.652172,
    },
  },
];
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
          {ride.vehicle_type}
        </Typography>
        {onlineDriver.map((driver) => (
          <AdvancedMarker
            key={driver.id}
            position={driver.location}
            onClick={() => setRide((prev) => (prev ? { ...prev, driver_id: driver.id } : null))}
            title='Tài xế'
          />
        ))}
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
