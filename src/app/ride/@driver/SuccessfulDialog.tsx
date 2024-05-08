import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CardIcon from '@mui/icons-material/CreditCardRounded';
import CashIcon from '@mui/icons-material/LocalAtmRounded';

import { useToast } from '@/hooks';
import { BookingStatus } from '@/libs/enum';
import { updateRideStatus } from '@/libs/query';
import { LoadingButton } from '@/libs/ui';
import { formatPrice } from '@/libs/utils';

export default function SuccessfulDialog({ props, booking }: { props: DialogProps; booking: any }) {
  const router = useRouter();
  const toast = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: () => updateRideStatus(booking.id, BookingStatus.COMPLETED),
    onSuccess: () => {
      router.push('/');
    },
    onError: (message) => {
      toast.setToast('error', 'Xác nhận thanh toán thất bại', `Kiểm tra lại đường truyền hoặc thử lại sau\n${message}`);
    },
  });

  return (
    <Dialog {...props}>
      <DialogTitle variant='body1'>Thanh toán cho {booking.name}</DialogTitle>
      <DialogContent sx={{ textAlign: 'center' }}>
        <DialogContentText>
          {booking.paymentMethod == 'cash' ? (
            <CashIcon sx={{ width: '3rem', height: '3rem' }} />
          ) : (
            <CardIcon sx={{ width: '3rem', height: '3rem' }} />
          )}
        </DialogContentText>

        <DialogContentText fontWeight='bold' variant='h4' color='black'>
          {formatPrice(booking.price)}
        </DialogContentText>

        <DialogContentText>
          {booking.paymentMethod == 'cash' ? 'Thu tiền mặt trước khi xác nhận' : 'Không cần thu tiền mặt'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton size='large' fullWidth onClick={() => mutate()} loading={isPending}>
          Xác nhận thanh toán
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
