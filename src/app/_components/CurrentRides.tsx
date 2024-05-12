import * as React from 'react';
import Link from 'next/link';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import { currentBookings } from '@/libs/query';
import { BookingStatus, VehicleType } from '@/libs/enum';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Mã cuốc', width: 90 },
  {
    field: 'payment_method',
    headerName: 'Phương thức thanh toán',
    width: 200,
    valueGetter: (value) => `${value == 'card' ? 'Thẻ' : 'Tiền mặt'}`,
  },
  {
    field: 'status',
    headerName: 'Trạng thái',
    description: 'Trạng thái của một cuốc xe hiện tại',
    renderCell: (params) => (
      <Chip
        color={params.value == 'Tìm tài xế' ? 'warning' : 'default'}
        variant='outlined'
        label={params.value}
        size='small'
      />
    ),
    valueGetter: (value) => {
      switch (value) {
        case BookingStatus.PENDING:
          return 'Tìm tài xế';
        case BookingStatus.PICKED_UP:
          return 'Đã đón khách';
        case BookingStatus.IN_PROGRESS:
          return 'Đang di chuyển';
        case BookingStatus.ARRIVED:
          return 'Chờ thanh toán';
        default:
          return 'Hoàn thành';
      }
    },
    width: 150,
  },
  {
    field: 'vehicle_type',
    headerName: 'Loại xe',
    width: 110,
    valueGetter: (value) =>
      `${value == VehicleType.MOTORBIKE ? 'Xe máy' : value == VehicleType.CAR4 ? 'Xe 4 chỗ' : VehicleType.CAR7}`,
  },
  {
    field: 'booking_route',
    headerName: 'Đường đi',
    sortable: false,
    width: 350,
    valueGetter: (_value, row) =>
      `${row.booking_route.pick_up.formatted_address || ''} - ${row.booking_route.destination.formatted_address || ''}`,
  },
  {
    field: 'price',
    headerName: 'Giá',
    sortable: true,
    width: 100,
  },
  {
    field: 'more',
    headerName: 'Xem thêm',
    sortable: false,
    width: 100,
    renderCell: (params) => <Link href={`/ride/${params.row.id}`}>Xem thêm</Link>,
  },
];

export default function CurrentRides() {
  const { data, status } = useQuery({
    queryKey: ['bookings'],
    queryFn: currentBookings,
  });

  if (status === 'error') return <div>Error</div>;
  if (status === 'success' || status === 'pending') {
    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          loading={status === 'pending'}
          rows={data || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      </Box>
    );
  }
  return null;
}
