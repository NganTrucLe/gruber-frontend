import { useRouter } from 'next/navigation';

import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CardIcon from '@mui/icons-material/CreditCardRounded';
import CashIcon from '@mui/icons-material/LocalAtmRounded';

import { formatPrice } from '@/libs/utils';

// TODO: Update data schema passed by parent component
export default function SuccessfulDialog({ props, booking }: { props: DialogProps; booking: any }) {
  const router = useRouter();

  const handleCheckout = () => {
    // TODO: trigger firebase and backend to update payment
    router.push('/home');
  };

  return (
    <Dialog {...props}>
      <DialogTitle variant='body1'>Thanh toán cho {booking.customer.name}</DialogTitle>
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
        <Button size='large' fullWidth onClick={handleCheckout}>
          Xác nhận thanh toán
        </Button>
      </DialogActions>
    </Dialog>
  );
}
