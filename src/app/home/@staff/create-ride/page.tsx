'use client';
import dynamic from 'next/dynamic';
import { useMutation } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';

import { Vehicle } from '@/libs/enum';
import { createRideFromStaffFull } from '@/libs/query';
import { LoadingButton } from '@/libs/ui';
import { fullRideState } from './atom';
import BasicInfoForm from './BasicInfoForm';

const DynamicChooseDriver = dynamic(() => import('./ChooseDriver'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function CreateRidePage() {
  const [fullRide] = useRecoilState(fullRideState);
  const { mutate, isPending } = useMutation({
    mutationFn: createRideFromStaffFull,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: ({ message }) => {
      alert(message);
    },
  });

  const handleCreateRide = () => {
    if (fullRide && fullRide.driver_id) {
      mutate({
        ...fullRide,
        vehicle_type: fullRide.vehicle_type as Vehicle,
      });
    }
  };

  return (
    <>
      {fullRide ? (
        <>
          <DynamicChooseDriver />
          <LoadingButton loading={isPending} onClick={handleCreateRide}>
            Tạo cuốc
          </LoadingButton>
        </>
      ) : (
        <BasicInfoForm />
      )}
    </>
  );
}
