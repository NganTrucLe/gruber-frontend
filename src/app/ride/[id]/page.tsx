'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { useRecoilValue } from 'recoil';
import { roleState } from '@/recoils/atom';
import { Role } from '@/libs/enum';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { LoadingButton, Marker } from '@/libs/ui';
import { useCurrentLocation, useGoogleMapAPI } from '@/hooks';
import BackIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { bookingDetail } from '@/libs/query';
import { CircularProgress } from '@mui/material';
import { formatBookingStatus, formatPrice, formatVehicleType } from '@/libs/utils';

export default function RideDetailsPage({ params }: { params: { id: string } }) {
  const role = useRecoilValue(roleState);
  const { apiKey, mapId } = useGoogleMapAPI();
  const router = useRouter();
  const position = useCurrentLocation();
  if (role !== Role.STAFF) {
    router.push('/');
  }
  const { data, status } = useQuery({
    queryKey: ['bookings', params.id],
    queryFn: () => bookingDetail(params.id),
  });

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
                <IconButton component={Link} href='/'>
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
                  {Boolean(data.driver) && data.driver.fullName ? (
                    <>
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
                      <br />
                      <Typography textAlign='center' sx={{ color: 'text.secondary' }}>
                        Chưa có tài xế, vui lòng chọn 1 tài xế trên bản đồ
                      </Typography>
                      <br />
                      <LoadingButton
                        loading={false}
                        sx={{ width: 'fit-content', left: '50%', transform: 'translate(-50%,0)' }}>
                        Gửi thông tin đến tài xế
                      </LoadingButton>
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
