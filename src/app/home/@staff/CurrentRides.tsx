import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import { currentRides } from '@/libs/query';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Mã cuốc', width: 90 },
  {
    field: 'payment_method',
    headerName: 'Phương thức thanh toán',
    width: 200,
    valueGetter: (value) => `${value == 'card' ? 'Chuyển khoản' : 'Tiền mặt'}`,
  },
  {
    field: 'status',
    headerName: 'Trạng thái',
    description: 'Trạng thái của một cuốc xe hiện tại',
    renderCell: (params) => (
      <Chip
        color={params.value == 'Chờ xác nhận' ? 'warning' : 'default'}
        variant='outlined'
        label={params.value}
        size='small'
      />
    ),
    valueGetter: (value) =>
      `${value == 'pending' ? 'Chờ xác nhận' : value == 'picked_up' ? 'Đã đón khách' : value == 'in_progress' ? 'Đang di chuyển' : 'Hoàn thành'}`,
    width: 150,
  },
  {
    field: 'vehicle_type',
    headerName: 'Loại xe',
    width: 110,
    valueGetter: (value) => `${value == 'motorbike' ? 'Xe máy' : value == 'car4' ? 'Xe 4 chỗ' : 'Xe 7 chỗ'}`,
  },
  {
    field: 'booking_route',
    headerName: 'Đường đi',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 250,
    valueGetter: (_value, row) => `${row.pick_up || ''} - ${row.destination || ''}`,
  },
];

export default function CurrentRides() {
  const { data, status } = useQuery({
    queryKey: ['currentRides'],
    queryFn: currentRides,
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
