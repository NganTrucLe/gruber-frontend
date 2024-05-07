'use client';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { useRecoilState } from 'recoil';

import { Typography } from '@mui/material';

import { fullRideState, pickupState } from './atom';

const onlineDriver = [
  {
    id: 1,
    location: {
      lat: 10.764622,
      lng: 106.650172,
    },
  },
  {
    id: 2,
    location: {
      lat: 10.704722,
      lng: 106.64,
    },
  },
  {
    id: 3,
    location: {
      lat: 10.674822,
      lng: 106.652172,
    },
  },
];
export default function ChooseDriver() {
  const [fullRide, setFullRide] = useRecoilState(fullRideState);
  const [pickup] = useRecoilState(pickupState);
  const [destination] = useRecoilState(pickupState);

  if (fullRide)
    return (
      <div>
        <Typography>
          <b>Điểm đón khách: </b>
          {pickup?.formatted_address}
        </Typography>
        <Typography>
          <b>Điểm trả khách: </b>
          {destination?.formatted_address}
        </Typography>
        <Typography>
          <b>Tên khách hàng: </b>
          {fullRide.name}
        </Typography>
        <Typography>
          <b>Số điện thoại: </b>
          {fullRide.phone}
        </Typography>
        <Typography>
          <b>Loại xe: </b>
          {fullRide.vehicle_type}
        </Typography>
        {onlineDriver.map((driver) => (
          <AdvancedMarker
            key={driver.id}
            position={driver.location}
            onClick={() => setFullRide((prev) => (prev ? { ...prev, driver_id: driver.id } : null))}
            title='Tài xế'
          />
        ))}
        {fullRide.driver_id ? (
          <Typography>
            <b>Thông tin tài xế: </b>
            {fullRide.driver_id}
          </Typography>
        ) : (
          <Typography>Vui lòng chọn một tài xế</Typography>
        )}
      </div>
    );
  else return null;
}
