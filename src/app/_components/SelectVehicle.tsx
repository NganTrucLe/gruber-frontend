'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import CarIcon from '@mui/icons-material/DriveEtaRounded';
import MotorbikeIcon from '@mui/icons-material/TwoWheelerRounded';

import { Vehicle } from '@/libs/enum';
import { formatPrice } from '@/libs/utils';
import { getVehiclePrice } from '@/libs/query';

interface SelectVehicleProps {
  distance: number;
  onSelectVehicle: (vehicle: Vehicle) => void;
  selected: Vehicle;
}

export default function SelectVehicle(props: SelectVehicleProps) {
  const { distance, onSelectVehicle, selected } = props;
  const { data: price, status } = useQuery({
    queryKey: ['price', distance],
    queryFn: () => getVehiclePrice(Math.round(distance)),
  });

  if (status === 'success') {
    const vehicles = [
      { type: 'motorbike', name: 'Xe máy', icon: <MotorbikeIcon />, price: price.motorbike },
      { type: 'car4', name: 'Xe 4 chỗ', icon: <CarIcon />, price: price.car4 },
      { type: 'car7', name: 'Xe 7 chỗ', icon: <CarIcon />, price: price.car7 },
    ];

    return (
      <List>
        {vehicles.map((vehicle) => (
          <ListItemButton
            key={vehicle.type}
            onClick={() => onSelectVehicle(vehicle.type as Vehicle)}
            selected={selected === vehicle.type}>
            <ListItemIcon sx={{ minWidth: '2rem' }}>{vehicle.icon}</ListItemIcon>
            <Stack width='100%' direction='row' justifyContent='space-between'>
              <Typography fontWeight='600'>{vehicle.name}</Typography>
              <Typography fontWeight='600'>{formatPrice(vehicle.price)}</Typography>
            </Stack>
          </ListItemButton>
        ))}
      </List>
    );
  } else {
    return <Typography>Đang tải giá...</Typography>;
  }
}
