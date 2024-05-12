'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { useRecoilValue } from 'recoil';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CircularProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import BackIcon from '@mui/icons-material/KeyboardBackspaceRounded';

import { roleState } from '@/recoils/atom';
import { useCurrentLocation, useGoogleMapAPI, useToast } from '@/hooks';
import { Role, BookingStatus } from '@/libs/enum';
import { LoadingButton, Marker } from '@/libs/ui';
import { assignDriverToBooking, bookingDetail } from '@/libs/query';
import { formatBookingStatus, formatPrice, formatVehicleType } from '@/libs/utils';

const ChooseDriver = dynamic(() => import('./ChooseDriver'), { ssr: false });

export default function RideDetailsPage({ params }: { params: { id: string } }) {
  const role = useRecoilValue(roleState);
  const queryClient = useQueryClient();
  const { setToast } = useToast();
  const [driver, setDriver] = useState<string | null>(null);
  const { apiKey, mapId } = useGoogleMapAPI();
  const router = useRouter();
  const position = useCurrentLocation();
  const { data, status } = useQuery({
    queryKey: ['bookings', params.id],
    queryFn: () => bookingDetail(params.id),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: () => assignDriverToBooking(params.id, driver!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', params.id] });
    },
    onError: (error) => {
      setToast('error', error.message);
    },
  });
  if (role !== Role.STAFF && role !== Role.ADMIN) {
    router.push('/');
    return null;
  }

  return (
    <main>
      <Stack direction='row' spacing={2}>
        {apiKey === undefined ? (
          <Typography variant='h6'>Không thể tải map</Typography>
        ) : (
          <APIProvider apiKey={apiKey}>
            <Box sx={{ position: 'relative', height: '100vh', width: '100%', flexGrow: 1 }}>
              <Map
                defaultCenter={position}
                defaultZoom={15}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                mapId={mapId}>
                {status == 'success' && data ? (
                  <>
                    {data.booking_route.pick_up.location && (
                      <Marker position={data.booking_route.pick_up.location} role='driver' />
                    )}
                    {data.booking_route.destination.location && (
                      <Marker position={data.booking_route.destination.location} role='driver' type='destination' />
                    )}
                  </>
                ) : null}
              </Map>
            </Box>
            <Stack spacing={0} sx={{ width: '100%', flexGrow: 1, py: 2, pr: 2 }}>
              <Typography variant='h5' fontWeight='bold' gutterBottom>
                <IconButton
                  onClick={() => {
                    router.back();
                  }}>
                  <BackIcon />
                </IconButton>
                &emsp;Chi tiết cuốc xe
              </Typography>
              {status == 'pending' ? <CircularProgress /> : null}
              {status == 'success' && data ? (
                <>
                  <Typography variant='h6' fontWeight='bold'>
                    Thông tin cuốc xe
                  </Typography>
                  <Typography>
                    <b>Loại xe:</b> {formatVehicleType(data.vehicle_type)}
                  </Typography>
                  <Typography>
                    <b>Điểm đón:</b> {data.booking_route.pick_up.formatted_address}
                  </Typography>
                  <Typography>
                    <b>Điểm đến:</b> {data.booking_route.destination.formatted_address}
                  </Typography>
                  <Typography>
                    <b>Trạng thái:</b> {formatBookingStatus(data.status)}
                  </Typography>
                  <Typography>
                    <b>Giá:</b> {formatPrice(data.price)}
                  </Typography>
                  <Typography>
                    <b>Thời gian bắt đầu:</b> {data.started_on}
                  </Typography>
                  <Typography>
                    <b>Thời gian kết thúc:</b> {data.finished_on}
                  </Typography>
                  <br />
                  <Typography variant='h6' fontWeight='bold'>
                    Thông tin khách hàng
                  </Typography>
                  <Typography>
                    <b>Tên:</b> {data.name}
                  </Typography>
                  <Typography>
                    <b>Số điện thoại:</b> {data.phone}
                  </Typography>
                  <Typography>
                    <b>Đánh giá:</b> {data.passenger_rating ? data.passenger_rating : 'Chưa có đánh giá'}
                  </Typography>
                  <br />
                  <Typography variant='h6' fontWeight='bold'>
                    Thông tin tài xế
                  </Typography>
                  {data.driverId ? (
                    <>
                      <Typography>
                        <b>Mã tài xế:</b> {data.driverId}
                      </Typography>
                      <Typography>
                        <b>Tên:</b> {data.driver.name}
                      </Typography>
                      <Typography>
                        <b>Số điện thoại:</b> {data.driver.phone}
                      </Typography>
                      <Typography>
                        <b>Đánh giá:</b> {data.driver_rating ? data.driver_rating : 'Chưa có đánh giá'}
                      </Typography>
                    </>
                  ) : (
                    <>
                      {data.status !== BookingStatus.COMPLETED && data.status !== BookingStatus.CANCELLED ? (
                        <>
                          <br />
                          <Typography textAlign='center' sx={{ color: 'text.secondary' }}>
                            Chưa có tài xế, vui lòng chọn 1 tài xế trên bản đồ
                          </Typography>
                          <br />
                          <ChooseDriver onSelectDriver={(id) => setDriver(id)} />
                          {driver ? (
                            <Typography gutterBottom>
                              <b>Đã chọn tài xế:</b> {driver}
                            </Typography>
                          ) : null}
                          <LoadingButton
                            loading={isPending}
                            disabled={driver === null}
                            onClick={() => mutate()}
                            sx={{ width: 'fit-content', left: '50%', transform: 'translate(-50%,0)' }}>
                            Gửi thông tin đến tài xế
                          </LoadingButton>
                        </>
                      ) : null}
                    </>
                  )}
                </>
              ) : null}
            </Stack>
          </APIProvider>
        )}
      </Stack>
    </main>
  );
}
