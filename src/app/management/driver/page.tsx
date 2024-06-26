'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DataGrid, GridColDef, GridActionsCellItem, GridCellParams } from '@mui/x-data-grid';

import { getDrivers, lockDriver } from '@/libs/query';
import { styled } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/LockRounded';
import UnlockIcon from '@mui/icons-material/LockOpenRounded';
import ViewDetailIcon from '@mui/icons-material/VisibilityRounded';

import { Typography, Box } from '@mui/material';
import { useToast } from '@/hooks';
import { AdminNavbar } from '@/app/_components/AdminNavbar';
import { formatVehicleType } from '@/libs/utils';

const Main = styled('main')(({ theme }) => ({
  margin: '0 5rem',
  [theme.breakpoints.down('md')]: {
    margin: '0 1rem',
  },
  '& section': {
    margin: '2rem 0 0 0',
  },
}));

export default function DriverManagementPage() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data, status } = useQuery({
    queryKey: ['huhu'],
    queryFn: getDrivers,
  });

  const { mutate } = useMutation({
    mutationKey: ['driver'],
    mutationFn: lockDriver,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ['huhu'] });
      toast.setToast('success', message);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'fullName', headerName: 'Họ và tên', flex: 2 },
    { field: 'phone', headerName: 'Điện thoại', flex: 2 },
    {
      field: 'vehicle_type',
      headerName: 'Loại xe',
      flex: 2,
      valueGetter: (value) => `${value ? formatVehicleType(value) : 'Không xác định'}`,
    },
    {
      field: 'vehicle_plate',
      headerName: 'Biển số xe',
      flex: 2,
      valueGetter: (value) => value || 'Không xác định',
    },
    {
      field: 'activityStatus',
      headerName: 'Trạng thái hoạt động',
      flex: 2,
      valueGetter: (value) => (value == 'online' ? 'Đang hoạt động' : 'Không hoạt động'),
    },
    {
      field: 'isValidated',
      headerName: 'Đã xác thực',
      flex: 2,
      type: 'boolean',
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      flex: 2,
      renderCell: (params: GridCellParams) => [
        <GridActionsCellItem
          key={params.row.id}
          icon={params.row.isValidated ? <LockIcon /> : <UnlockIcon />}
          label='Khoá tài khoản'
          onClick={() => mutate(params.row.id)}
        />,
        <GridActionsCellItem
          key={params.row.id}
          icon={<ViewDetailIcon />}
          label='Xem chi tiết'
          onClick={() => console.log('View detail')}
        />,
      ],
    },
  ];

  return (
    <Main>
      <AdminNavbar />
      <section>
        <Typography variant='h6' fontWeight='bold' gutterBottom>
          Các tài xế hiện tại
        </Typography>

        {status === 'error' && <div>Error</div>}
        {(status === 'success' || status === 'pending') && (
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              loading={status === 'pending'}
              rows={data ?? []}
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
        )}
      </section>
    </Main>
  );
}
