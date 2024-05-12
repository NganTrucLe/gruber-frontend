'use client';
// Example return data:
// {
//     "id": 71082,
//     "booking_route": {
//       "pick_up": {
//         "formatted_address": "122 Diệp Minh Châu, Phường Tân Sơn Nhì, Tân Phú, Hồ Chí Minh, Vietnam",
//         "location": {
//           "lat": 10.795829,
//           "lng": 106.632268
//         }
//       },
//       "destination": {
//         "formatted_address": "47-8 Hẻm 03 Bình Giã, phường 13, Tân Bình, Hồ Chí Minh, Vietnam",
//         "location": {
//           "lat": 10.799583,
//           "lng": 106.643588
//         }
//       }
//     },
//     "driver": {
//       "name": "Nguyễn Văn B",
//       "avatar": "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
//     },
//     "phone": "0901234567",
//     "name": "Nguyễn Văn A",
//     "started_on": "2024-05-03T12:00:00",
//     "finished_on": "2024-05-03T12:30:00",
//     "driver_rating": null,
//     "passenger_rating": 5,
//     "payment_method": "cash",
//     "vehicle_type": "car4",
//     "price": 20000
//   }
// }

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DriverIcon from '@mui/icons-material/ManRounded';
import { Map, APIProvider } from '@vis.gl/react-google-maps';
import { getBookingById } from '@/libs/query';
import { useGoogleMapAPI } from '@/hooks';
import { styled, Typography } from '@mui/material';

import { Directions, Marker } from '@/libs/ui';

interface Booking {
  id: string;
}

const MapContainer = styled(APIProvider)({
  position: 'absolute',
});

interface RideDetailDialogProps {
  open: boolean;
  booking: Booking;
  onClose: (value: string) => void;
}

// export default function RideDetailDialog(props: RideDetailDialogProps) {
//     const { onClose, booking, open } = props;
//     const { apiKey, mapId } = useGoogleMapAPI();

//     const { data, status } = useQuery({
//         queryKey: ['booking-detail', booking.id],
//         queryFn: () => getBookingById(booking.id)
//     });

//     const handleClose = () => {
//         onClose('');
//     };

//     const handleListItemClick = (value: string) => {
//         onClose(value);
//     };

//     return (
//         <Dialog open={open} onClose={handleClose}>
//             <DialogTitle>Thông tin cuốc xe</DialogTitle>
//             <List>
//                 {status === 'success' && data && (
//                     <>
//                         <ListItem>
//                             <ListItemButton onClick={() => handleListItemClick('card')}>
//                                 <ListItemIcon>
//                                     <DriverIcon />
//                                 </ListItemIcon>
//                                 <ListItemText primary={`Booking ID: ${data.id}`} />
//                             </ListItemButton>
//                         </ListItem>
//                         <ListItem>
//                             <ListItemText primary={`Driver Name: ${data.driver.name}`} />
//                             <ListItemText primary={`Phone: ${data.phone}`} />
//                             <ListItemText primary={`Payment Method: ${data.payment_method}`} />
//                             <ListItemText primary={`Vehicle Type: ${data.vehicle_type}`} />
//                             <ListItemText primary={`Price: ${data.price}`} />
//                         </ListItem>
//                         {apiKey === undefined ? (
//                             <Typography variant='h6'>Không thể tải map</Typography>
//                         ) : (
//                             <MapContainer apiKey={apiKey}>
//                                 <Map
//                                     defaultZoom={15}
//                                     gestureHandling={'greedy'}
//                                     disableDefaultUI={true}
//                                     mapId={mapId}
//                                     center={{
//                                         lng: data.booking_route.pick_up.location.lng,
//                                         lat: data.booking_route.pick_up.location.lat
//                                     }}
//                                 >
//                                     <AdvancedMarker
//                                         position={{
//                                             lng: data.booking_route.pick_up.location.lng,
//                                             lat: data.booking_route.pick_up.location.lat
//                                         }}
//                                     />
//                                     <AdvancedMarker
//                                         position={{
//                                             lng: data.booking_route.destination.location.lng,
//                                             lat: data.booking_route.destination.location.lat
//                                         }}
//                                     />
//                                 </Map>
//                             </MapContainer>
//                         )}
//                     </>
//                 )}
//             </List>
//         </Dialog>
//     );
// }
export default function RideDetailDialog(props: RideDetailDialogProps) {
  const { onClose, booking, open } = props;
  const { apiKey, mapId } = useGoogleMapAPI();

  const { data, status } = useQuery({
    queryKey: ['booking-detail', booking.id],
    queryFn: () => getBookingById(booking.id),
  });

  const handleClose = () => {
    onClose('');
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  // Check if the data is loaded and the API key is defined
  if (status === 'success' && data && apiKey) {
    const pickup = data.booking_route.pick_up;
    const destination = data.booking_route.destination;

    console.log({ pickup, destination });

    // Check if the coordinates are valid
    if (data.booking_route.pick_up.location.lat && data.booking_route.pick_up.location.lng) {
      return (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Thông tin cuốc xe</DialogTitle>
          <List>
            <ListItem>
              <ListItemButton onClick={() => handleListItemClick('card')}>
                <ListItemIcon>
                  <DriverIcon />
                </ListItemIcon>
                <ListItemText primary={`Booking ID: ${data.id}`} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <MapContainer apiKey={apiKey}>
                <Map zoom={15} defaultZoom={15} gestureHandling={'greedy'} disableDefaultUI={true} mapId={mapId}>
                  {pickup !== null && pickup?.location ? <Marker position={pickup.location} type='pickup' /> : null}
                  {destination !== null && destination?.location ? (
                    <Marker position={destination.location} type='destination' />
                  ) : null}
                  {pickup !== null && destination !== null ? (
                    <Directions
                      origin={pickup?.location as unknown as google.maps.LatLngLiteral}
                      destination={destination?.location as unknown as google.maps.LatLngLiteral}
                      mainDirection
                    />
                  ) : null}
                </Map>
              </MapContainer>
            </ListItem>
            <ListItem>
              <ListItemText primary={`Driver Name: ${data.driver.name}`} />
              <ListItemText primary={`Phone: ${data.phone}`} />
              <ListItemText primary={`Payment Method: ${data.payment_method}`} />
              <ListItemText primary={`Vehicle Type: ${data.vehicle_type}`} />
              <ListItemText primary={`Price: ${data.price}`} />
            </ListItem>
          </List>
        </Dialog>
      );
    }
  }

  // If the data is not loaded or the API key is not defined, display an error message
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Thông tin cuốc xe</DialogTitle>
      <List>
        <Typography variant='h6'>Không thể tải map</Typography>
      </List>
    </Dialog>
  );
}
