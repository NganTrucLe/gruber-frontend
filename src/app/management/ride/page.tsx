'use client';
import { styled } from '@mui/material/styles';
import { DataGrid, GridColDef, GridActionsCellItem, GridCellParams } from '@mui/x-data-grid';

import { Box, Typography } from '@mui/material';

import { AdminNavbar } from '@/app/_components/AdminNavbar';
import { useQuery } from '@tanstack/react-query';

import ViewDetailIcon from '@mui/icons-material/VisibilityRounded';

import { getBookingHistory } from '@/libs/query';

import RideDetailDialog from '@/app/_components/RideDetailDialog';
import { SetStateAction, useState } from 'react';

const Main = styled('main')(({ theme }) => ({
  margin: '0 5rem',
  [theme.breakpoints.down('md')]: {
    margin: '0 1rem',
  },
  '& section': {
    margin: '2rem 0 0 0',
  },
}));

export default function RideManagementPage() {
  const { data, status } = useQuery({
    queryKey: ['rides'],
    queryFn: getBookingHistory,
  });

  const mappedData =
    data?.map((item: any, index: number) => ({
      ...item,
      id: index + 1,
      realId: item.id,
      pick_up_point: item.booking_route.pick_up.formatted_address,
      destination_point: item.booking_route.destination.formatted_address,
    })) || [];

  const [open, setOpen] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const handleOpen = (id: SetStateAction<null>) => {
    setBookingId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'pick_up_point', headerName: 'Điểm đón', flex: 2 },
    { field: 'destination_point', headerName: 'Điểm đến', flex: 2 },
    {
      field: 'finished_on',
      headerName: 'Thời điểm hoàn thành',
      flex: 2,
      valueFormatter: (value) => new Date(value).toLocaleString(),
    },
    {
      field: 'payment_method',
      headerName: 'Hình thức thanh toán',
      flex: 2,
      valueGetter: (value) => (value === 'cash' ? 'Tiền mặt' : 'card' ? 'Thẻ ngân hàng' : 'Không xác định'),
    },
    {
      field: 'vehicle_type',
      headerName: 'Loại phương tiện',
      flex: 2,
      valueGetter: (value) =>
        value === 'motorbike' ? 'Xe máy' : value === 'car4' ? 'Xe 4 chỗ' : 'car7' ? 'Xe 7 chỗ' : 'Không xác định',
    },
    {
      field: 'price',
      headerName: 'Tổng tiền',
      flex: 2,
      valueFormatter: (value) => `${(value as number).toLocaleString('en-US')} VNĐ`,
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      flex: 2,
      renderCell: (params: GridCellParams) => [
        <GridActionsCellItem
          key={params.row.id}
          icon={<ViewDetailIcon />}
          label='Xem chi tiết'
          onClick={() => handleOpen(params.row.realId)}
        />,
      ],
    },
  ];

  return (
    <Main>
      <AdminNavbar />
      <section>
        <Typography variant='h6' fontWeight='bold' gutterBottom>
          Danh sách các cuốc xe
        </Typography>

        {status === 'error' && <div>Error</div>}
        {(status === 'success' || status === 'pending') && (
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              loading={status === 'pending'}
              rows={mappedData}
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
            {bookingId && <RideDetailDialog open={open} booking={{ id: bookingId }} onClose={handleClose} />}
          </Box>
        )}
      </section>
    </Main>
  );
}
