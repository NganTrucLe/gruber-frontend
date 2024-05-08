'use client';
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

interface SelectVehicleProps {
  priceMotorbike: number;
  priceCar4: number;
  priceCar7: number;
  onSelectVehicle: (vehicle: Vehicle) => void;
  selected: Vehicle;
}

export default function SelectVehicle(props: SelectVehicleProps) {
  const { priceMotorbike, priceCar4, priceCar7, onSelectVehicle, selected } = props;

  const vehicles = [
    { type: 'motorbike', name: 'Xe máy', icon: <MotorbikeIcon />, price: priceMotorbike },
    { type: 'car4', name: 'Xe 4 chỗ', icon: <CarIcon />, price: priceCar4 },
    { type: 'car7', name: 'Xe 7 chỗ', icon: <CarIcon />, price: priceCar7 },
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
}
